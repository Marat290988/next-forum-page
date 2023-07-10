import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Prisma } from './../../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method !== 'GET') {
    res.status(403).json({message: 'Only GET requests allowed.'});
    return;
  }
  const prisma = Prisma.getPrisma();
  let sections;
  try {
    sections = await prisma.section.findMany({
      select: {
        name: true,
        id: true,
        forums: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  } catch (e) {
    res.status(422).json({message: 'Problems with DB.'});
    return;
  }
  res.status(200).json({message: 'OK.', sections});
}