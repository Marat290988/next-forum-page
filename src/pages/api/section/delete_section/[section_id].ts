import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '../../../../utils/prisma';
import { checkOnAdmin } from '@/utils/token';
import { deleteForumTree } from '@/utils/delete-from-db.util';

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

    const section_id = Number.parseInt(req.query.section_id as string);
    let forums;
    const prisma = Prisma.getPrisma();

    try {
      forums = await prisma.forum.findMany({
        where: {
          parent: section_id
        }
      });
    } catch (e) {
      res.status(422).json({message: 'Problems with DB.'});
      return;
    }

    if (forums && forums.length > 0) {
      forums.forEach(async f => {
        await deleteForumTree(res, f.id);
      });
    }

    try {
      await prisma.section.delete({
        where: {
          id: section_id
        }
      });
    } catch (e) {
      res.status(422).json({message: 'Problems with DB.'});
      return;
    }

    res.status(200).json({message: 'Section has been deleted.'});
  }
