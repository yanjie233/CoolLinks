"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  siteName: z.string().min(2, {
    message: "网站名称必须至少2个字符",
  }),
  siteDescription: z.string(),
  logoUrl: z
    .string()
    .url({
      message: "请输入有效的URL",
    })
    .optional()
    .or(z.literal("")),
  faviconUrl: z
    .string()
    .url({
      message: "请输入有效的URL",
    })
    .optional()
    .or(z.literal("")),
})

export function SiteSettingsForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "酷链接",
      siteDescription: "创建短链接，完全掌控",
      logoUrl: "",
      faviconUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // 在实际应用中，这将是一个API调用
    setTimeout(() => {
      toast({
        title: "设置已更新",
        description: "您的网站设置已更新",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站名称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>这是显示在浏览器标签和网站标题中的名称。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站描述</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>用于SEO和社交分享的元标签。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/logo.png" {...field} />
              </FormControl>
              <FormDescription>您网站logo的URL。推荐尺寸：200x50px。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faviconUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favicon URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/favicon.ico" {...field} />
              </FormControl>
              <FormDescription>您网站favicon的URL。应为.ico或.png文件。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "保存中..." : "保存设置"}
        </Button>
      </form>
    </Form>
  )
}

