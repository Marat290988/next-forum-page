import { Prisma } from '@/utils/prisma';
import { checkOnAdmin } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method !== 'DELETE') {
      res.status(403).json({message: `Only DELETE requests allowed.`});
      return;
    }
    try {
      checkOnAdmin(req);
    } catch(e) {
      res.status(403).json({message: `Access is denied.`});
    }

    const topic_id = Number.parseInt(req.query.topic_id as string);
    const prisma = Prisma.getPrisma();

    try {
      await prisma.comment.deleteMany({
        where: {
          themeId: topic_id
        }
      });
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
    }

    try {
      await prisma.theme.delete({
        where: {
          id: topic_id
        }
      });
      prisma.$disconnect();
    } catch(e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
    }

    res.status(200).json({message: 'Topic has been deleted.'});

  }