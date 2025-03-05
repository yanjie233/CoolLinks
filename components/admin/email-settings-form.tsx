"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  smtpHost: z.string().min(1, {
    message: "SMTP host is required",
  }),
  smtpPort: z.number().int().min(1).max(65535),
  smtpUsername: z.string(),
  smtpPassword: z.string(),
  emailFrom: z.string().email({
    message: "Please enter a valid email address",
  }),
  imapHost: z.string().min(1, {
    message: "IMAP host is required",
  }),
  imapPort: z.number().int().min(1).max(65535),
  imapUsername: z.string(),
  imapPassword: z.string(),
  allowedDomains: z.string(),
  blockedDomains: z.string(),
})

export function EmailSettingsForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "user@example.com",
      smtpPassword: "",
      emailFrom: "noreply@example.com",
      imapHost: "imap.example.com",
      imapPort: 993,
      imapUsername: "user@example.com",
      imapPassword: "",
      allowedDomains: "example.com\ngmail.com\noutlook.com",
      blockedDomains: "spam.com\ntemp-mail.org",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Email settings updated",
        description: "Your email configuration has been saved",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="smtp" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="smtp">SMTP</TabsTrigger>
            <TabsTrigger value="imap">IMAP</TabsTrigger>
            <TabsTrigger value="allowlist">Domain Rules</TabsTrigger>
          </TabsList>
          <TabsContent value="smtp" className="pt-4 space-y-4">
            <FormField
              control={form.control}
              name="smtpHost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Host</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smtpPort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Port</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smtpUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smtpPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email From</FormLabel>
                  <FormControl>
                    <Input placeholder="noreply@example.com" {...field} />
                  </FormControl>
                  <FormDescription>The email address that verification emails will be sent from.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="imap" className="pt-4 space-y-4">
            <FormField
              control={form.control}
              name="imapHost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMAP Host</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imapPort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMAP Port</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imapUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMAP Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imapPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMAP Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="allowlist" className="pt-4 space-y-4">
            <FormField
              control={form.control}
              name="allowedDomains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed Email Domains</FormLabel>
                  <FormControl>
                    <Textarea placeholder="example.com" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>Enter one domain per line. Leave empty to allow all domains.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blockedDomains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blocked Email Domains</FormLabel>
                  <FormControl>
                    <Textarea placeholder="spam.com" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter one domain per line. These domains will not be allowed to register.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Email Settings"}
        </Button>
      </form>
    </Form>
  )
}

