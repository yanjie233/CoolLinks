import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AccountForm } from "@/components/dashboard/account-form"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="设置" description="管理您的账户设置和偏好。" />
      <Separator />
      <div className="grid gap-10">
        <AccountForm />
      </div>
    </DashboardShell>
  )
}

