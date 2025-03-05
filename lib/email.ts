import nodemailer from "nodemailer"

export async function sendVerificationEmail(email: string) {
  // 创建一个带有SMTP配置的传输器
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // 生成验证令牌（在实际应用中，这将存储在数据库中）
  const verificationToken = Math.random().toString(36).substring(2, 15)

  // 创建验证URL
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`

  // 发送邮件
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "验证您的电子邮箱地址",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>验证您的电子邮箱地址</h2>
        <p>感谢您注册酷链接。请点击下方按钮验证您的电子邮箱地址。</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          验证邮箱
        </a>
        <p>如果您没有注册酷链接，可以忽略此邮件。</p>
        <p>此链接将在24小时后过期。</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string) {
  // 创建一个带有SMTP配置的传输器
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // 生成重置令牌（在实际应用中，这将存储在数据库中）
  const resetToken = Math.random().toString(36).substring(2, 15)

  // 创建重置URL
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

  // 发送邮件
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "重置您的密码",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>重置您的密码</h2>
        <p>您请求重置酷链接账户的密码。请点击下方按钮重置密码。</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          重置密码
        </a>
        <p>如果您没有请求重置密码，可以忽略此邮件。</p>
        <p>此链接将在1小时后过期。</p>
      </div>
    `,
  })
}

