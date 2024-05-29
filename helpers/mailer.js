import User from "@/db/UserModel";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer'

const sendEmail = async ({email, emailType, userId}) => {
  try {
    console.log("email, emailType, userId ==>" , email, emailType, userId);
    const hashedToken =await bcryptjs.hash(userId.toString(), 10);
    console.log("hashedToken->>.",hashedToken);
    if (emailType == "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyPasswordToken: hashedToken,
        verifyPasswordTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "aa65fb62d3c17f",
          pass: "35bd7d8608b556"
        }
      });

      const mailOptions ={
        from : 'usmanrizwan771@gmail.com',
        to : email,
        subject : emailType == 'verify' ? 'Verify your account' : 'Reset your password',
        html : emailType == 'verify' ? `<p>Click on the link to verify your account</p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify Your Account  <br/> <span>Token Number ${hashedToken} </span></a>` : `<p>Click on the link to reset your password</p><a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Reset  Your Password  <br/> <span> Token Number ${hashedToken} </span></a>`
      }
      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse;
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
