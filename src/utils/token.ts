import Cookies from 'js-cookie';
import * as jose from 'jose';
import { NextApiRequest } from 'next';
import IUser from './../interface/user.interface';
import { Role } from '@/enum/roles.enum';

export const signJwt = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime(options.exp)
    .setIssuedAt()
    .setSubject(payload.sub)
    .sign(new TextEncoder().encode(process.env.SECRET));
  return jwt;
}

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.SECRET)
      )
    ).payload as T;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};

export const fff = async (token: any) => {
  console.log(await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY)
  ))
}

export const decodeToken = () => {
  const token = Cookies.get('token') as string;
  if (token) {
    const decodeToken: any = jose.decodeJwt(token);
    return JSON.parse(decodeToken.sub);
  } else {
    return null;
  }
}

export const decodePassedToken = (token: string) => {
  const decodeToken: any = jose.decodeJwt(token);
  return JSON.parse(decodeToken.sub);
}

export const checkOnAdmin = (request: NextApiRequest) => {
  const token = request.cookies['token'] as string;
  const decodeToken: any = jose.decodeJwt(token);
  const parsedUser: IUser = JSON.parse(decodeToken.sub);
  if (parsedUser.role !== Role.ADMIN) {
    throw new Error('User is not admin!');
  }
}