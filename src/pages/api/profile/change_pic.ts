import { Prisma } from "@/utils/prisma";
import { decodePassedToken, verifyJWT } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }
    try {
      verifyJWT(req.cookies['token'] as string);
    } catch(e) {
      res.status(403).json({message: 'Access is denied.'});
      return;
    }

    const { id } = decodePassedToken(req.cookies['token'] as string);
    const { imgUrl } = req.body;

    if (!id) {
      res.status(403).json({message: 'Access is denied.'});
      return;
    }

    const path = require('path');
    const pathFolder = path.resolve('public', 'pics');
    const fs = require('fs');
    const fileNames: string[] = fs.readdirSync(pathFolder).map((fileName: string) => {
      return 'pics/' + fileName;
    });

    const index = fileNames.findIndex(f => f === imgUrl);

    if (index === -1) {
      res.status(403).json({message: 'Access is denied.'});
      return;
    }

    const prisma = Prisma.getPrisma();

    console.log(id)

    if (id) {
      try {
        await prisma.user.update({
          where: {
            id: id
          },
          data: {
            imgUrl: imgUrl
          }
        });
      } catch(e) {
        res.status(422).json({message: 'Problems with DB.'});
        prisma.$disconnect();
        return;
      }
    }

    res.status(200).json({message: 'Pic successfully has been updated.'});

  }