import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { GroupsTable } from "@/components/admin/groups-table"
import { CreateGroupButton } from "@/components/admin/create-group-button"

export default function UserGroupsPage() {
  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <AdminHeader heading="User Groups" description="Manage user groups and permissions." />
        <CreateGroupButton />
      </div>
      <GroupsTable />
    </AdminShell>
  )
}

