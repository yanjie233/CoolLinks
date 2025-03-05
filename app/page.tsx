import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GitHubLogoIcon, GlobeIcon, LockClosedIcon, TimerIcon } from "@radix-ui/react-icons"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-7xl items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold inline-block">酷链接</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                功能
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
                价格
              </Link>
              <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                文档
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Link href="/login" className="px-4">
                <Button variant="ghost" size="sm">
                  登录
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">开始使用</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    创建短链接，完全掌控
                  </h1>
                  <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    酷链接为您提供强大的工具，用于创建、管理和跟踪短网址，支持自定义过期日期、密码保护等功能。
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="mb-2 sm:mb-0">
                      开始使用
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" size="lg">
                      了解更多
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md rounded-lg bg-gradient-to-r from-primary/30 via-primary/10 to-primary/20 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <GlobeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">自定义短网址</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">创建易记的品牌链接</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <TimerIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">灵活过期设置</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">设置自定义链接生命周期</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <LockClosedIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">密码保护</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">安全访问您的链接</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <GlobeIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">自定义网址</h3>
                  <p className="text-gray-500 dark:text-gray-400">创建反映您身份的易记品牌链接。</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <TimerIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">过期控制</h3>
                  <p className="text-gray-500 dark:text-gray-400">设置链接在1天、7天、30天后过期，或创建永久链接。</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <LockClosedIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">安全功能</h3>
                  <p className="text-gray-500 dark:text-gray-400">使用密码保护您的链接并控制对内容的访问。</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 酷链接。保留所有权利。</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <GitHubLogoIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

