import nodemailer from "nodemailer";

export default function nodemailerFunc(msg: string, email: string) {
  const transporter = nodemailer.createTransport({
    host: "mail.actionsmm.com.ng",
    port: 465,
    secure: true,
    auth: {
      // add this to .env. Back up in Google drive.
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false, // no SSL present on actionsmm. That's the reason for this.
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"ActionSMM Team" <info@actionsmm.com.ng>',
      to: email,
      subject: "Welcome to ActionSMM",
      text: "Hello world?",
      html: msg,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
}
