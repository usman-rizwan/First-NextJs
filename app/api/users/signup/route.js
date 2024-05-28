import  {connectToDB}  from "../../../../db/dbConfig";
import User from "../../../../db/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "@/helpers/mailer";

connectToDB();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    console.log(username , email , password);

    // check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({status:401,  message: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("Saved User ===>",savedUser);

    // create token
    const tokenData = { id: savedUser._id , username: savedUser.name };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await sendEmail({email , emailType:"verify" , userId : savedUser._id})

    const response = NextResponse.json({ message: "User created" , savedUser , token });
    response.cookies.set("token", token ,{ httpOnly: true });
    return response;

    // return NextResponse.json({ message: "User created" , savedUser });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      error: error.message,
    });
  }
}
