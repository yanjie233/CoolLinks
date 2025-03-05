"use client"

import { useState } from "react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { LuMoreHorizontal, LuTrash, LuPencil, LuUsers } from "react-icons/lu"

// Mock data for demonstration
const groups = [
  {
    id: 1,
    name: "Free",
    linkLimit: 5,
    expirationOptions: ["1 day", "3 days", "7 days"],
    canUsePassword: false,
    canUseCustomSlug: false,
    canUseInterstitial: true,
    userCount: 127,
  },
  {
    id: 2,
    name: "Premium",
    linkLimit: 100,
    expirationOptions: ["1 day", "3 days", "7 days", "14 days", "30 days", "Never"],
    canUsePassword: true,
    canUseCustomSlug: true,
    canUseInterstitial: true,
    userCount: 43,
  },
  {
    id: 3,
    name: "Business",
    linkLimit: 500,
    expirationOptions: ["1 day", "3 days", "7 days", "14 days", "30 days", "Never"],
    canUsePassword: true,
    canUseCustomSlug: true,
    canUseInterstitial: true,
    userCount: 12,
  },
  {
    id: 4,
    name: "Admin",
    linkLimit: -1, // Unlimited
    expirationOptions: ["1 day", "3 days", "7 days", "14 days", "30 days", "Never", "Custom"],
    canUsePassword: true,
    canUseCustomSlug: true,
    canUseInterstitial: true,
    userCount: 3,
  },
]

export function GroupsTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteGroup = (id: number) => {
    setIsLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Group deleted",
        description: "The user group has been deleted",
      })
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Link Limit</TableHead>
            <TableHead className="hidden md:table-cell">Expiration Options</TableHead>
            <TableHead className="hidden md:table-cell">Features</TableHead>
            <TableHead>Users</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>{group.linkLimit === -1 ? "Unlimited" : group.linkLimit}</TableCell>
              <TableCell className="hidden md:table-cell">
                {group.expirationOptions.length > 3
                  ? `${group.expirationOptions.slice(0, 3).join(", ")}...`
                  : group.expirationOptions.join(", ")}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {group.canUsePassword && <Badge variant="outline">Password</Badge>}
                  {group.canUseCustomSlug && <Badge variant="outline">Custom Slug</Badge>}
                  {group.canUseInterstitial && <Badge variant="outline">Interstitial</Badge>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <LuUsers className="mr-2 h-4 w-4 text-muted-foreground" />
                  {group.userCount}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <LuMoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={`/admin/groups/${group.id}/edit`}>
                        <LuPencil className="mr-2 h-4 w-4" />
                        Edit group
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={`/admin/groups/${group.id}/users`}>
                        <LuUsers className="mr-2 h-4 w-4" />
                        View users
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteGroup(group.id)}
                      disabled={isLoading || group.name === "Admin" || group.userCount > 0}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LuTrash className="mr-2 h-4 w-4" />
                      Delete group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

