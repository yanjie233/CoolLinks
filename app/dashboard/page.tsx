import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LinkCreateButton } from "@/components/dashboard/link-create-button"
import { LinksTable } from "@/components/dashboard/links-table"
import { UserWelcomeBanner } from "@/components/dashboard/user-welcome-banner"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <UserWelcomeBanner />
      <div className="flex items-center justify-between">
        <DashboardHeader heading="链接" description="创建和管理您的短链接。" />
        <LinkCreateButton />
      </div>
      <LinksTable />
    </DashboardShell>
  )
}

