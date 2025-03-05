import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AccountForm } from "@/components/dashboard/account-form"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" description="Manage your account settings and preferences." />
      <Separator />
      <div className="grid gap-10">
        <AccountForm />
      </div>
    </DashboardShell>
  )
}

