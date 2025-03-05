import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { UsersTable } from "@/components/admin/users-table"

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminHeader heading="管理员控制面板" description="管理用户、用户组和网站设置。" />
      <UsersTable />
    </AdminShell>
  )
}

