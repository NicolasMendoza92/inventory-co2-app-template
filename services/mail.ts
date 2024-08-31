import { createTransporter } from "@/lib/mailerConfig";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = await createTransporter();

  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const mailOptions = {
    from: "Yending App <yendingapp@gmail.com>",
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
  const transporter = await createTransporter();
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  const mailOptions = {
    from: "Yending App <yendingapp@gmail.com>",
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
  const transporter = await createTransporter();

  const mailOptions = {
    from: "Yending App <yendingapp@gmail.com>",
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
