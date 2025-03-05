import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "登录 | 酷链接",
  description: "登录您的酷链接账户",
}

export default function LoginPage() {
  return (
    <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-screen">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center">
            酷链接
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"酷链接彻底改变了我们与受众分享内容的方式。分析和安全功能无与伦比。"</p>
            <footer className="text-sm">索菲亚·戴维斯 - 市场总监</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">登录您的账户</h1>
            <p className="text-sm text-muted-foreground">输入您的邮箱和密码登录账户</p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            还没有账户？{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

