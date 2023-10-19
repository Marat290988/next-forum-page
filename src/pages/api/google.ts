import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";
import { axiosReq } from "@/axios/api";
import { Prisma } from "@/utils/prisma";
import { hash } from "argon2";
import { signJwt } from "@/utils/token";
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(403).json({message: 'Only GET requests allowed.'});
    return;
  }

  const token = req.query.token;
  
  if (!token) {
    res.status(403).json({message: 'Missing token.'});
  }

  axiosReq({url: `https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${token}`})
    .then(async resG => {
      if (resG.data.expires_in > 0) {
        const prisma = Prisma.getPrisma();
        try {
          const oldEmail = await prisma.user.findUnique({
            where: {email: resG.data.email}
          });
          let resUser: any;
          if (oldEmail) {
            resUser = {...oldEmail};
          } else {
            resUser =  await prisma.user.create({
              data: {
                email: resG.data.email,
                name: resG.data.email.split('@')[0],
                password: await hash('rijifjihjfrgihgjirhhdfgkjfdngkgdfg654654g65df4g654df65g4d6f45g65fd4g6d4f65g4fd6g54fd654g65df4g')
              }
            });
          }

          delete resUser.password;
          const tokenMaxAge = (new Date().getTime()); // 1 week

          const token: string = await signJwt(
            { sub: JSON.stringify(resUser) },
            { exp: `7d` }
          );
      
          const cookieOptions = {
            httpOnly: false,
            path: "/",
            secure: false,
            maxAge: tokenMaxAge,
          };
      
          res.setHeader('Set-Cookie', serialize('token', token, {...cookieOptions}));
          prisma.$disconnect();
          res.status(200).json({user: resUser, message: 'Successful logging.'});
        } catch {
          prisma.$disconnect();
          res.status(422).json({message: 'Problems with DB.'});
          return;
        }
      }
    }).
    catch(() => {
      res.status(422).json({message: 'Problems with server.'});
    });

}