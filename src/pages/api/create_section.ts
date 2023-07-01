import { decodeToken } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';

interface ISection {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method !== 'POST') {
    res.status(403).json({message: 'Only POST requests allowed.'});
    return;
  }
  const decodeString = (jose.decodeJwt(req.cookies['token'] as string));
  const role = JSON.parse(decodeString.sub as string).role;
  res.status(200).json({message: role})
}