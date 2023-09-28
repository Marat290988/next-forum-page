import { NextApiRequest, NextApiResponse } from 'next';
import { decodePassedToken } from '@/utils/token';
import { Prisma } from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }

    const userId = decodePassedToken(req.cookies['token'] as string)?.id;

    if (!userId) {
      res.status(403).json({message: 'Access is denied.'});
      return;
    }

    const { stars, commentId } = req.body;


    const prisma = Prisma.getPrisma();

    let like;

    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: +commentId
        }
      });
      like = await prisma.likeF.findUnique({
        where: {
          likeIdentifier: {
            commentId: +commentId,
            userId: userId
          }
        }
      });
      if (!like) {
        await prisma.likeF.create({
          data: {
            comment: {
              connect: {
                id: +commentId
              }
            },
            user: {
              connect: {
                id: +userId
              }
            },
            valueLike: +stars,
            commentOwner: comment!.authorCommentId
          }
        })
      } else {
        await prisma.likeF.update({
          where: {
            likeIdentifier: {
              commentId: +commentId,
              userId: userId
            }
          },
          data: {
            valueLike: +stars
          }
        });
      }
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    res.status(200).json({message: 'LIKE'});
  }