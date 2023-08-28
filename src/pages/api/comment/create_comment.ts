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

    const prisma = Prisma.getPrisma();
    const { text, topicId, forumId } = req.body;

    try {
      const themeId = topicId;
      await prisma.comment.create({
        data: {
          authorCommentId: +userId,
          themeId: themeId,
          forumId: +forumId,
          isPrimary: 'N',
          text: text
        }
      });
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    res.status(200).json({message: 'OK'});
  }