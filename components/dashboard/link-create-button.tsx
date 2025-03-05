"use client"

import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  destination: z.string().url({
    message: "请输入有效的URL",
  }),
  customSlug: z.string().optional(),
  expiration: z.string(),
  password: z.string().optional(),
  showInterstitial: z.boolean().default(true),
})

export function LinkCreateButton() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      customSlug: "",
      expiration: "7",
      password: "",
      showInterstitial: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // 在实际应用中，这将是一个API调用
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
      toast({
        title: "链接已创建",
        description: "您的新短链接已创建",
      })
      form.reset()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus className="mr-2 h-4 w-4" />
          新建链接
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新的短链接</DialogTitle>
          <DialogDescription>输入目标URL并自定义您的短链接选项。</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>目标URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/my-long-url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自定义URL后缀（可选）</FormLabel>
                  <FormControl>
                    <Input placeholder="my-custom-link" {...field} />
                  </FormControl>
                  <FormDescription>留空将生成随机后缀。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>链接过期时间</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择过期时间" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1天</SelectItem>
                      <SelectItem value="3">3天</SelectItem>
                      <SelectItem value="7">7天</SelectItem>
                      <SelectItem value="14">14天</SelectItem>
                      <SelectItem value="30">30天</SelectItem>
                      <SelectItem value="0">永不过期</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码保护（可选）</FormLabel>
                  <FormControl>
                    <Input placeholder="留空表示无密码" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showInterstitial"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>显示中间页</FormLabel>
                    <FormDescription>在重定向到目标地址前显示预览页面。</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "创建中..." : "创建链接"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

