import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <div className="flex flex-col gap-8 p-4 md:gap-10 md:p-10">{children}</div>
}

