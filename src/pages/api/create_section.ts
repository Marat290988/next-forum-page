import { checkOnAdmin } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';

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
  try {
    checkOnAdmin(req);
  } catch(e) {
    console.log(e)
  }
  // const decodeUser: IUser = decodePassedToken(req.cookies['token'] as string);
  // const role = decodeUser.role;
  res.status(200).json({message: 'OK'});
}