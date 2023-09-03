import { checkOnAccess, deleteComment } from '@/utils/delete-from-db.util';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const comment_id = Number.parseInt(req.query.comment_id as string);
    const isAllow = await checkOnAccess(req, res, comment_id, 'DELETE');
    if (!isAllow) {
      return;
    }
    await deleteComment(res, comment_id);
    res.status(200).json({message: 'Comment has been deleted.'})
  }