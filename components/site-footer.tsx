import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 酷链接。保留所有权利。</p>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/terms" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            条款
          </Link>
          <Link
            href="/privacy"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            隐私
          </Link>
          <Link
            href="/contact"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            联系我们
          </Link>
        </nav>
      </div>
    </footer>
  )
}

