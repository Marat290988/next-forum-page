import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
      if (req.method !== 'GET') {
        res.status(403).json({message: 'Only GET requests allowed.'});
        return;
      }
      const section_id = Number.parseInt(req.query.section_id as string);
      const prisma = Prisma.getPrisma();
      let forums;
      try {
        forums = await prisma.forum.findMany({
          where: {
            parent: section_id 
          },
          select: {
            name: true,
            id: true,
          }
        });
        prisma.$disconnect();
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        return;
      }
      res.status(200).json({message: 'OK.', forums});
  }