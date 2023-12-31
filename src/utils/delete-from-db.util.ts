import { NextApiRequest, NextApiResponse } from 'next';
import { decodePassedToken } from './token';
import { Prisma } from './prisma';

export const checkOnAccess = async (req: NextApiRequest, res: NextApiResponse, commentId: number, type: 'DELETE' | 'PATCH'): Promise<boolean> => {

  if (req.method !== type) {
    res.status(403).json({message: `Only ${type} requests allowed.`});
    return false;
  }

  const userId = decodePassedToken(req.cookies['token'] as string)?.id;
  const role = decodePassedToken(req.cookies['token'] as string)?.role;

  if (!userId) {
    res.status(403).json({message: 'Access is denied.'});
    return false;
  }

  const prisma = Prisma.getPrisma();

  let comment;

  try {
    comment = await prisma.comment.findUnique({
      where: {
        id: commentId
      }
    });
    prisma.$disconnect();
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
    return false;
  }

  if (comment?.authorCommentId === userId || role === 'admin') {
    return true;
  } else {
    return false;
  }

}

export const deleteComment = async (res: NextApiResponse, commentId: number): Promise<void> => {
  const prisma = Prisma.getPrisma();

  try {
    await prisma.comment.delete({
      where: {
        id: commentId
      }
    });
    prisma.$disconnect();
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
  }
  
}

export const deleteForumTree = async (res: NextApiResponse, parentId: number): Promise<void> => {
  const prisma = Prisma.getPrisma();

  let forums;

  try {
    forums = await prisma.forum.findMany({
      where: {
        forumParentId: parentId
      }
    });
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
  }

  if (forums && forums.length > 0) {
    forums.forEach(async f => {
      await deleteForumTree(res, f.id);
    });
    await prisma.forum.delete({
      where: {
        id: parentId
      }
    });
  } else {
    try {
      await prisma.comment.deleteMany({
        where: {
          forumId: parentId
        }
      });
      await prisma.theme.deleteMany({
        where: {
          forumId: parentId
        }
      });
      await prisma.forum.delete({
        where: {
          id: parentId
        }
      });
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
    }
  }
  
}