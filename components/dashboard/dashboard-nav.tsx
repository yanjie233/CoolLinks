"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLink, LuSettings, LuBarChart } from "react-icons/lu"

import { cn } from "@/lib/utils"

const items = [
  {
    title: "链接",
    href: "/dashboard",
    icon: LuLink,
  },
  {
    title: "分析",
    href: "/dashboard/analytics",
    icon: LuBarChart,
  },
  {
    title: "设置",
    href: "/dashboard/settings",
    icon: LuSettings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

