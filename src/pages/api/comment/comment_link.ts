import { Prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }

    const prisma = Prisma.getPrisma();
    const { topic_id, comment_id } = req.body;

    if (!topic_id || !comment_id) {
      res.status(403).json({message: 'Missing field topic_id or comment_id.'});
      return;
    }

    let link;

    try {
      const rows = await prisma.comment.findMany({
        where: {
          themeId: topic_id
        },
        select: {
          id: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      const rowNumber = rows.findIndex((row) => +row.id === +comment_id) + 1;
      link = `topic?t=${topic_id}&p=${Math.ceil(rowNumber / 10)-1}&c=10&id=${comment_id}`

    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    res.status(200).json({link});

  }