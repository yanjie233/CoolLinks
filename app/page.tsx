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
              <span className="font-bold inline-block">CoolLinks</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Pricing
              </Link>
              <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Link href="/login" className="px-4">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
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
                    Create Short Links with Full Control
                  </h1>
                  <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    CoolLinks gives you powerful tools for creating, managing, and tracking short URLs with custom
                    expiration dates, password protection, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="mb-2 sm:mb-0">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" size="lg">
                      Learn More
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
                        <p className="text-sm font-medium leading-none">Custom Short URLs</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create memorable, branded links</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <TimerIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Flexible Expiration</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Set custom link lifetime</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <LockClosedIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Password Protection</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Secure access to your links</p>
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
                  <h3 className="text-lg font-bold mb-2">Custom URLs</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Create memorable branded links that reflect your identity.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <TimerIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">Expiration Control</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Set links to expire after 1 day, 7 days, 30 days, or create permanent links.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <LockClosedIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">Security Features</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Protect your links with passwords and control access to your content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 CoolLinks. All rights reserved.</p>
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

