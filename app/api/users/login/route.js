import { connectToDB } from "../../../../db/dbConfig";
import User from "../../../../db/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectToDB();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);

    // check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ status: 401, message: "User not found" });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ status: 401, message: "Invalid password" });
    }
    
    return NextResponse.json({
      status: 200,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error logging in",
      error: error.message,
    });
  }
}
