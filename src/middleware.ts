import { NextResponse, NextRequest } from "next/server";

export const user_route = ["/mycards", "/chat", "/profile"];

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("lk_user");
  const { pathname, href } = req.nextUrl;

  if (!verify && user_route.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LK_CARDS}`);
  }
}
