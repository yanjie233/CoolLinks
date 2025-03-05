import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { UsersTable } from "@/components/admin/users-table"

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Admin Dashboard" description="Manage users, groups, and site settings." />
      <UsersTable />
    </AdminShell>
  )
}

