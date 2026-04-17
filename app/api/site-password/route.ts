import { NextRequest, NextResponse } from "next/server"

const SITE_PASSWORD = process.env.SITE_PASSWORD || "FanslyMaster2026!"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === SITE_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set("site-access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    })
    return response
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 })
}
