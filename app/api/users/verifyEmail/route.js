import { connectToDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/db/UserModel";

connectToDB();

export async function POST(req) {
  try {
    const token = await req.json();
    console.log(token);

    const user = await User.findOne({
      verifyPasswordToken: token,
      verifyPasswordTokenexpiry: { $gt: Date.now() },
    });
    if (!user) {
        return NextResponse.json({error : "Invalid Token" } , {status:400})
    }
    console.log(user);

    user.isVerified = true;
    user.verifyPasswordToken = null;
    user.verifyPasswordTokenExpiry = null;
    await user.save();
  } catch (error) {
    console.log(error);
  }
}
