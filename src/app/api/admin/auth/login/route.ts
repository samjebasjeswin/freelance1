import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { username?: string; password?: string };

    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";

    // Simple demo auth (root/root)
    if (username !== "root" || password !== "root") {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "admin_session",
      value: "1",
      httpOnly: true,
      path: "/admin",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Login failed" }, { status: 500 });
  }
}

