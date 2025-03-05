"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { LuMoreHorizontal, LuTrash, LuPencil, LuLock, LuUnlock } from "react-icons/lu"

// Mock data for demonstration
const users = [
  {
    id: 1,
    email: "john.doe@example.com",
    username: "johndoe",
    createdAt: new Date("2023-01-15"),
    userGroup: "Standard",
    isAdmin: false,
    isVerified: true,
    isBanned: false,
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    username: "janesmith",
    createdAt: new Date("2023-02-20"),
    userGroup: "Premium",
    isAdmin: false,
    isVerified: true,
    isBanned: false,
  },
  {
    id: 3,
    email: "admin@example.com",
    username: "adminuser",
    createdAt: new Date("2022-12-01"),
    userGroup: "Admin",
    isAdmin: true,
    isVerified: true,
    isBanned: false,
  },
  {
    id: 4,
    email: "mark.wilson@example.com",
    username: "markwilson",
    createdAt: new Date("2023-03-10"),
    userGroup: "Standard",
    isAdmin: false,
    isVerified: false,
    isBanned: true,
  },
]

export function UsersTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const banUser = (id: number) => {
    setIsLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "User banned",
        description: "The user has been banned from the platform",
      })
      setIsLoading(false)
    }, 500)
  }

  const unbanUser = (id: number) => {
    setIsLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "User unbanned",
        description: "The user has been unbanned from the platform",
      })
      setIsLoading(false)
    }, 500)
  }

  const deleteUser = (id: number) => {
    setIsLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "User deleted",
        description: "The user account has been deleted",
      })
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search users by email or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">User Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="hidden md:table-cell">{format(user.createdAt, "MMM dd, yyyy")}</TableCell>
                <TableCell className="hidden md:table-cell">{user.userGroup}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.isAdmin && <Badge>Admin</Badge>}
                    {!user.isVerified && <Badge variant="outline">Unverified</Badge>}
                    {user.isBanned && <Badge variant="destructive">Banned</Badge>}
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
                        <a href={`/admin/users/${user.id}/edit`}>
                          <LuPencil className="mr-2 h-4 w-4" />
                          Edit user
                        </a>
                      </DropdownMenuItem>
                      {user.isBanned ? (
                        <DropdownMenuItem onClick={() => unbanUser(user.id)} disabled={isLoading}>
                          <LuUnlock className="mr-2 h-4 w-4" />
                          Unban user
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => banUser(user.id)} disabled={isLoading}>
                          <LuLock className="mr-2 h-4 w-4" />
                          Ban user
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => deleteUser(user.id)}
                        disabled={isLoading || user.isAdmin}
                        className="text-red-600 focus:text-red-600"
                      >
                        <LuTrash className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

