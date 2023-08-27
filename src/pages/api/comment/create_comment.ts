import { NextApiRequest, NextApiResponse } from 'next';
import { decodePassedToken } from '@/utils/token';
import { Prisma } from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    console.log(req.body)
    
    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }

    const userId = decodePassedToken(req.cookies['token'] as string)?.id;
    console.log(userId)

    if (!userId) {
      res.status(403).json({message: 'Access is denied.'});
      return;
    }

    const { text, topicId } = req.body;

    res.status(200).json({text, topicId});
  }