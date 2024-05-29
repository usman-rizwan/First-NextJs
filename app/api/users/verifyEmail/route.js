import { connectToDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/db/UserModel";

connectToDB();

export async function POST(req) {
  try {
    const responseToken = await req.json();
    console.log("verify token ===> " , responseToken.token);

    const user = await User.findOne({
      verifyPasswordToken:  responseToken.token,
      verifyPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
        return NextResponse.json({error : "Invalid Token" } , {status:400})
    }
    console.log(user);

    user.isVerified = true;
    user.verifyPasswordToken = null;
    user.verifyPasswordTokenExpiry = null;
   const savedUser =  await user.save();
   return NextResponse.json({ message: "Email verified" , savedUser } ,{status:200});
  } catch (error) {
    console.log(error);
  }
}
