import { Prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import QueryString from "qs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method !== 'GET') {
      res.status(403).json({message: 'Only GET requests allowed.'});
      return;
    }

    const forum_id = Number.parseInt(req.query.parent_id as string);
    const prisma = Prisma.getPrisma();

    const rawParams = req.url?.split('?')[1];

    let qtyComment = 10;
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

    let topics;
    let totalTopics;

    try {
      totalTopics = await prisma.theme.count({
        where: {forumId: forum_id}
      });
      topics = await prisma.theme.findMany({
        ...skipTake,
        take: qtyComment,
        where: {
          forumId: forum_id
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          authorTheme: {
            select: {
              id: true,
              name: true
            }
          },
          title: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });
      prisma.$disconnect();
    } catch (e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    res.status(200).json({message: 'OK.', topics, totalTopics});
  }