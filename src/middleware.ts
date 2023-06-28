import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from '@/utils/token';

export async function middleware (req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (token) {
    try {
      await verifyJWT(token);
      if (closeForAuthorized.indexOf(req.nextUrl.pathname) > -1) {
        const homeUrl = req.nextUrl.origin;
        return NextResponse.redirect(homeUrl)
      }
    } catch(e) {
      const response = NextResponse.next();
      response.cookies.set('token', '');
      return response;
    }
  }
}

const closeForAuthorized = [
  '/auth'
]