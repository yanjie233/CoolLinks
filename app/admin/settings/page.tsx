import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { EmailSettingsForm } from "@/components/admin/email-settings-form"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="网站设置" description="管理全局网站设置和配置。" />
      <Separator />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="general">常规</TabsTrigger>
          <TabsTrigger value="email">邮箱</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <SiteSettingsForm />
        </TabsContent>
        <TabsContent value="email">
          <EmailSettingsForm />
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

