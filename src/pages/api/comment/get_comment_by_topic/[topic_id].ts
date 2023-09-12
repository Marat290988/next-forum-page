import { Prisma } from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';

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

    const rawParams = req.url?.split('?')[1];

    let qtyComment = 3;
    let skipTake = {};

    if (rawParams) {
      const params = QueryString.parse(rawParams as string);
      const page = +params.p!;
      // qtyComment = +params.c!;
      const skip = page * qtyComment;
      if (page && skip) {
        skipTake = { skip, take:  qtyComment};
      }
    }

    let topic;
    let comments;
    let totalComment;

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
      totalComment = await prisma.comment.count({
        where: {themeId: topic_id}
      });
      comments = await prisma.comment.findMany({
        ...skipTake,
        take: qtyComment,
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
          quoteCommentId: true,
          likes: {
            select: {
              valueLike: true
            }
          }
        }
      });
      comments.forEach(async (c: any) => {

        const result = c.likes.reduce(function(sum: number, current: {valueLike: number}) {
          return sum + current.valueLike;
        }, 0);
        c['avg'] = result / c.likes.length;        
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

    res.status(200).json({message: 'OK.', topic, comments, totalComment});
  }
