import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // если у пользователя нет токена то придет null
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // TODO: Делать редирект на app, если есть токен
  // TODO: Прочитать на заметку разделяется как нибудь для рутов и страниц middleware
}
export const config = {
  matcher: "/app/:path*",
};
