
import { NextApiRequest, NextApiResponse } from 'next';
import { checkOnAdmin } from '@/utils/token';
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
      const { name, sectionId } = req.body;
      const prisma = Prisma.getPrisma();
      let forum;
      try {
        forum = await prisma.forum.create({
          data: {
            name: name, 
            parent: sectionId
          }
        });
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        return;
      }
      res.status(200).json({message: 'Forum has been successfully created.', forum});
}