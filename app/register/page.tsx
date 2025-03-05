import type { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "注册 | 酷链接",
  description: "创建酷链接账户",
}

export default function RegisterPage() {
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
            <p className="text-lg">"创建带有过期日期和密码保护的自定义短链接从未如此简单。"</p>
            <footer className="text-sm">亚历克斯·陈 - 产品经理</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">创建账户</h1>
            <p className="text-sm text-muted-foreground">在下方输入您的详细信息以创建账户</p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            已有账户？{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

