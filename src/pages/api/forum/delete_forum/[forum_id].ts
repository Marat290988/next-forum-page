import { deleteForumTree } from '@/utils/delete-from-db.util';
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

    const forum_id = Number.parseInt(req.query.forum_id as string);

    await deleteForumTree(res, forum_id);

    res.status(200).json({message: 'Forum has been deleted.'});
  }