import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Prisma } from '../../utils/prisma';

interface IRegisterForm {
  name: string,
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
  const {email, name, password}: IRegisterForm = req.body;
  const prisma = Prisma.getPrisma();
  let user;
  try {
    const oldEmail = await prisma.user.findUnique({
      where: {email: email}
    });
    if (oldEmail) {
      res.status(422).json({message: 'Email is already busy.'});
      return;
    }
    const oldName = await prisma.user.findUnique({
      where: {name: name}
    });
    if (oldName) {
      res.status(422).json({message: 'User already exists.'});
      return;
    }
    user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await hash(password)
      }
    });
    prisma.$disconnect();
  } catch (e) {
    prisma.$disconnect();
    res.status(422).json({message: 'Problems with DB.'});
    return;
  }


  res.status(200).json({message: 'User has been created.'});
  return;
}
