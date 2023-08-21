import { Prisma } from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    if (req.method !== 'GET') {
      res.status(403).json({message: 'Only GET requests allowed.'});
      return;
    }

    const topic_id = Number.parseInt(req.query.topic_id as string);
    const prisma = Prisma.getPrisma();

    let topic;
    let comments;

    try {
      topic = await prisma.theme.findUnique({
        where: {
          id: topic_id
        },
        select: {
          id: true,
          title: true,
          forumId: true
        }
      });
      comments = await prisma.comment.findMany({
        where: {
          themeId: topic_id
        },
        select: {
          id: true,
          authorCommentId: true,
          authorComment: {
            select: {
              name: true,
              createdAt: true
            }
          },
          createdAt: true,
          updatedAt: true,
          isPrimary: true,
          text: true,
          quoteCommentId: true
        }
      });
      comments.forEach(async (c: any) => {
        if (c.quoteCommentId) {
          let qComment = await prisma.comment.findMany({
            where: {
              id: c.quoteCommentId
            },
            select: {
              id: true,
              authorCommentId: true,
              createdAt: true,
              updatedAt: true,
              isPrimary: true,
              text: true,
              quoteCommentId: true
            }
          });
          c['quote'] = qComment;
        }
      });
      prisma.$disconnect();
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      return;
    }

    res.status(200).json({message: 'OK.', topic, comments});
  }
