import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '../../../../utils/prisma';
import QueryString from 'qs';

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
      
      const rawParams = req.url?.split('?')[1];

      let qtyComment = 10;
      let skipTake = {};

      if (rawParams) {
        const params = QueryString.parse(rawParams as string);
        const page = +params.p!;
        // qtyComment = +params.c!;
        const skip = page * qtyComment;
        if (typeof page === 'number') {
          skipTake = { skip, take:  qtyComment};
        }
      }

      let forums;
      let themes: any[] = [];
      let totalRows;
      try {
        forums = await prisma.forum.findMany({
          ...skipTake,
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
        totalRows = await prisma.forum.count({
          where: {
            forumParentId: forum_parent_id
          }
        });
        if (forums.length === 0) {
          themes = await prisma.theme.findMany({
            ...skipTake,
            where: {
              forumId: forum_parent_id
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
          totalRows = await prisma.theme.count({
            where: {
              forumId: forum_parent_id
            }
          });
        }
        prisma.$disconnect();
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        return;
      }
      res.status(200).json(
        {message: 'OK.', forums, isForum: forums.length > 0 || forums.length === 0 && themes.length === 0, themes, totalRows}
      );
  }