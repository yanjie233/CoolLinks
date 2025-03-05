import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { EmailSettingsForm } from "@/components/admin/email-settings-form"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Site Settings" description="Manage global site settings and configurations." />
      <Separator />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
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

