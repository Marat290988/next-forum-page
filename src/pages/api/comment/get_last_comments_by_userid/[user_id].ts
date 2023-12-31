import { Prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(403).json({message: 'Only GET requests allowed.'});
    return;
  }

  const user_id = Number.parseInt(req.query.user_id as string);
  const prisma = Prisma.getPrisma();

  let comments;

  try {
    comments = await prisma.comment.findMany({
      skip: 0,
      take: 10,
      where: {
        authorCommentId: user_id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
    return;
  }

  res.status(200).json({comments});

}