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
      const forum_parent_id = Number.parseInt(req.query.forum_parent_id as string);
      const prisma = Prisma.getPrisma();
      let forums;
      let themes: any[] = [];
      try {
        forums = await prisma.forum.findMany({
          where: {
            forumParentId: forum_parent_id 
          },
          select: {
            name: true,
            id: true,
            // children: {
            //   select: {
            //     name: true,
            //     id: true
            //   }
            // }
          }
        });
        if (forums.length === 0) {
          themes = await prisma.theme.findMany({
            where: {
              forumId: forum_parent_id
            },
            select: {
              id: true,
              createdAt: true,
              authorTheme: {
                select: {
                  id: true,
                  name: true
                }
              },
              title: true
            }
          });
        }
        prisma.$disconnect();
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        return;
      }
      res.status(200).json(
        {message: 'OK.', forums, isForum: forums.length > 0 || forums.length === 0 && themes.length === 0, themes}
      );
  }