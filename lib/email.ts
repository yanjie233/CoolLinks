import nodemailer from "nodemailer"

export async function sendVerificationEmail(email: string) {
  // Create a transporter with the SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // Generate a verification token (in a real app, this would be stored in the database)
  const verificationToken = Math.random().toString(36).substring(2, 15)

  // Create the verification URL
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify your email address</h2>
        <p>Thank you for registering with CoolLinks. Please click the button below to verify your email address.</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>If you didn't register for CoolLinks, you can ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string) {
  // Create a transporter with the SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // Generate a reset token (in a real app, this would be stored in the database)
  const resetToken = Math.random().toString(36).substring(2, 15)

  // Create the reset URL
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>You requested a password reset for your CoolLinks account. Please click the button below to reset your password.</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>If you didn't request a password reset, you can ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  })
}

