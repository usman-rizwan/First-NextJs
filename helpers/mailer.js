import User from "@/db/UserModel";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'

const sendEmail = async (email, emailType, userId) => {
  try {
    const hashedToken = bcrypt.hash(userId.toString(), 10);
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
          user: "77f4d6aa3f9c3a",
          pass: "b67e227e1c048b"
        }
      });

      const mailOptions ={
        from : 'usmanrizwan771@gmail.com',
        to : email,
        subject : emailType == 'verify' ? 'Verify your account' : 'Reset your password',
        html : emailType == 'verify' ? `<p>Click on the link to verify your account</p><a href="http://localhost:3000/verifyemail?token=${hashedToken}">http://localhost:3000/verifyemail?token=${hashedToken}</a>` : `<p>Click on the link to reset your password</p><a href="http://localhost:3000/resetpassword?token=${hashedToken}">http://localhost:3000/resetpassword?token=${hashedToken}</a>`
      }
      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse;
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
