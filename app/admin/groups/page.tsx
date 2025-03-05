import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { GroupsTable } from "@/components/admin/groups-table"
import { CreateGroupButton } from "@/components/admin/create-group-button"

export default function UserGroupsPage() {
  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <AdminHeader heading="用户组" description="管理用户组和权限。" />
        <CreateGroupButton />
      </div>
      <GroupsTable />
    </AdminShell>
  )
}

