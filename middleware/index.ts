import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Check if this is a dashboard route
  if (request.nextUrl.pathname === "/dashboard") {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.redirect(
        new URL("/debitcard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
