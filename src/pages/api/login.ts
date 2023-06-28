import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verify } from 'argon2';
import { signJwt } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

interface ILoginForm {
  email: string,
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method !== 'POST') {
    res.status(403).json({message: 'Only POST requests allowed.'});
    return;
  }
  const {email, password}: ILoginForm = req.body;
  const prisma = new PrismaClient();
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {email: email}
    });
    if (!user) {
      res.status(403).json({message: 'Unable to find such user.'});
      return;
    };
    const isValid = await verify(user.password, password);
    if (!isValid) {
      res.status(403).json({message: 'Invalid password.'});
      return;
    }
    const resUser: any = {...user};
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
    res.status(200).json({user: resUser, message: 'Successful logging.'});

  } catch(e: any) {
    res.status(422).json({message: 'Problems with DB.'});
  }
}
