import { checkOnAdmin } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodePassedToken } from '../../../utils/token';
import { ISection } from '../../../interface/section.interface';
import { Prisma } from './../../../../prisma/prisma';

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
  const { id } = decodePassedToken(req.cookies['token'] as string);
  const { name }: ISection = req.body;
  const prisma = Prisma.getPrisma();
  let section;
  try {
    section = await prisma.section.create({
      data: {
        name: name, 
        createdBy: id
      }
    });
  } catch (e) {
    res.status(422).json({message: 'Problems with DB.'});
    return;
  }
  res.status(200).json({message: 'Section has been successfully created.', section});
}