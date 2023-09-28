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

  let user;
  let commentQ;
  let themesQ;
  let avgRating;

  try {
    user = await prisma.user.findUnique({
      where: {
        id: user_id
      },
      select: {
        createdAt: true,
        email: true,
        name: true,
        imgUrl: true,
        id: true
      }
    });
    commentQ = await prisma.comment.count({
      where: {
        authorCommentId: user_id
      }
    });
    themesQ = await prisma.theme.count({
      where: {
        authorThemeId: user_id
      }
    });
    avgRating = await prisma.likeF.aggregate({
      where: {
        commentOwner: user_id
      },
      _avg: {
        valueLike: true
      }
    });
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
    return;
  }

  res.status(200).json({message: 'OK.', user, commentQ, themesQ, avgRating: Math.round(+avgRating._avg!.valueLike!)});

}