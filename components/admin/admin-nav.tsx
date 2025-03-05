"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuUsers, LuSettings, LuUserCheck, LuLayoutDashboard } from "react-icons/lu"

import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LuLayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: LuUsers,
  },
  {
    title: "User Groups",
    href: "/admin/groups",
    icon: LuUserCheck,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: LuSettings,
  },
]

export function AdminNav() {
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

