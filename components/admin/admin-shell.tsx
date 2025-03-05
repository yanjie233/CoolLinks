import type React from "react"
interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return <div className="flex flex-col gap-8 p-4 md:gap-10 md:p-10">{children}</div>
}

