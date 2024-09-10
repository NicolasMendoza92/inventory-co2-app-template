import { createTransporter } from "@/lib/mailerConfig";
// import { Resend } from "resend";


//  API KEY de resend.com -> la version gratis funciona con el mail del admin , en este caso "nmapi2022@gmail.com"
if (!process.env.RESEND_API_KEY) {
  throw new Error('Invalid/Missing environment variable: "RESEND_API_KEY"')
}

const domain = process.env.NEXT_PUBLIC_APP_URL

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {

   // CON RESEND
  //  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  //  await resend.emails.send({
  //      from: "Inventory-App <onboarding@resend.dev>",
  //      to: email,
  //      subject: "Confirm your email",
  //      html: `<p> Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  //  })

  const transporter = await createTransporter();

  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const mailOptions = {
    from: "Inventory-App <nmapi2022@gmail.com>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {

  // const resetLink = `${domain}/auth/new-password?token=${token}`;

  // await resend.emails.send({
  //     from: "Inventory App <onboarding@resend.dev>",
  //     to: email,
  //     subject: "Reset your password",
  //     html: `<p> Click <a href="${resetLink}">here</a> to reset your password.</p>`
  // })
  const transporter = await createTransporter();
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const mailOptions = {
    from: "Inventory-App <nmapi2022@gmail.com>",
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent: " + info.response);
  } catch (error) {
    console.error("Error sending password reset email: " + error);
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

//   await resend.emails.send({
//     from: "Inventory App <onboarding@resend.dev>",
//     to: email,
//     subject: "2FA Code",
//     html: `<p> Your 2FA Code: ${token} </p>`
// })
  const transporter = await createTransporter();

  const mailOptions = {
    from: "Inventory-App <nmapi2022@gmail.com>",
    to: email,
    subject: "Your 2FA Code",
    html: `<p>Your 2FA code is: <strong>${token}</strong></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("2FA code email sent: " + info.response);
  } catch (error) {
    console.error("Error sending 2FA code email: " + error);
  }
};
