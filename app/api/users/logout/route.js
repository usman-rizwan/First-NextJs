import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      status: 200,
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error, status: 500 });
  }
}
