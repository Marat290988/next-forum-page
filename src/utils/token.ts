import Cookies from 'js-cookie';
import * as jose from 'jose';

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