"use client"

import { LuX } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function UserWelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative rounded-lg border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">欢迎使用酷链接！</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-8 w-8">
            <LuX className="h-4 w-4" />
            <span className="sr-only">关闭</span>
          </Button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <p>点击上方的"新建链接"按钮创建您的第一个短链接。您的链接将显示在下方的表格中。</p>
      </div>
    </div>
  )
}

