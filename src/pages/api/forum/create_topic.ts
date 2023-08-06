import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '../../../utils/prisma';
import { verifyJWT } from '@/utils/token';
import IUser from '@/interface/user.interface';

export type RequestCreateTopic = {
  authorId: string,
  title: string,
  typeTheme?: 'THEME' | 'VOTE',
  forumId: string,
  text: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }
    try {
      verifyJWT(req.cookies['token'] as string);
    } catch(e) {
      res.status(403).json({message: 'Access is denied.'});
    }
    
    const { authorId, title, forumId, text } = req.body as RequestCreateTopic;

    const prisma = Prisma.getPrisma();

    // Check for existing user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          id: +authorId
        }
      })
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    if (!user) {
      res.status(422).json({message: 'Such a user does not exist.'});
      return;
    }

    // Check for existing forum

    let forum;
    try {
      forum = await prisma.forum.findUnique({
        where: {
          id: +forumId
        }
      })
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    if (!forum) {
      res.status(422).json({message: 'Such a forum does not exist.'});
      return;
    }


    let theme;
    try {
      theme = await prisma.theme.create({
        data: {
          authorThemeId: +authorId,
          title: title,
          typeTheme: 'THEME',
          forumId: +forumId
        }
      })
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    let comment;

    try {
      const themeId = theme.id;
      comment = await prisma.comment.create({
        data: {
          authorCommentId: +authorId,
          themeId: themeId,
          forumId: +forumId,
          isPrimary: 'Y',
          text: text
        }
      });
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }
    
    res.status(200).json({message: 'Topic successfully has been created.'});
  }