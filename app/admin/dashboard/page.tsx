"use client"

import { Switch } from "@/components/ui/switch"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkIcon, Users, Settings, BarChart, Trash2, Edit, Lock, UserX, UserCheck, Search } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    createdAt: "2025-01-15T10:30:00Z",
    userGroup: "premium",
    status: "active",
    linksCount: 24,
  },
  {
    id: "2",
    username: "janedoe",
    email: "jane@example.com",
    createdAt: "2025-02-03T14:45:00Z",
    userGroup: "basic",
    status: "active",
    linksCount: 8,
  },
  {
    id: "3",
    username: "bobsmith",
    email: "bob@example.com",
    createdAt: "2025-02-20T09:15:00Z",
    userGroup: "premium",
    status: "suspended",
    linksCount: 15,
  },
  {
    id: "4",
    username: "alicejones",
    email: "alice@example.com",
    createdAt: "2025-03-01T11:20:00Z",
    userGroup: "basic",
    status: "active",
    linksCount: 3,
  },
]

// Mock data for links
const mockLinks = [
  {
    id: "1",
    originalUrl: "https://example.com/very/long/url/that/needs/to/be/shortened",
    shortCode: "ex1abc",
    createdAt: "2025-02-28T12:00:00Z",
    expiresAt: "2025-03-28T12:00:00Z",
    username: "johndoe",
    clicks: 245,
    hasPassword: true,
  },
  {
    id: "2",
    originalUrl: "https://anotherexample.com/blog/how-to-create-short-links",
    shortCode: "blog123",
    createdAt: "2025-03-01T14:30:00Z",
    expiresAt: null,
    username: "janedoe",
    clicks: 78,
    hasPassword: false,
  },
  {
    id: "3",
    originalUrl: "https://docs.example.com/api/reference/v2",
    shortCode: "api-docs",
    createdAt: "2025-03-03T09:15:00Z",
    expiresAt: "2025-04-03T09:15:00Z",
    username: "bobsmith",
    clicks: 132,
    hasPassword: false,
  },
  {
    id: "4",
    originalUrl: "https://learn.example.com/courses/web-development",
    shortCode: "webdev",
    createdAt: "2025-03-04T16:45:00Z",
    expiresAt: "2025-04-04T16:45:00Z",
    username: "alicejones",
    clicks: 56,
    hasPassword: true,
  },
]

// Mock data for user groups
const mockUserGroups = [
  {
    id: "1",
    name: "basic",
    maxLinks: 10,
    expirationOptions: ["1", "3", "7"],
    canUsePassword: false,
    canUseTransitionPage: true,
    canUseCustomSuffix: false,
  },
  {
    id: "2",
    name: "premium",
    maxLinks: 100,
    expirationOptions: ["1", "3", "7", "14", "30", "never"],
    canUsePassword: true,
    canUseTransitionPage: true,
    canUseCustomSuffix: true,
  },
]

// Mock data for site settings
const mockSiteSettings = {
  siteName: "CoolLinks",
  siteDescription: "Create and manage short links with custom features",
  logoUrl: "/logo.png",
  primaryColor: "#3b82f6",
  allowRegistration: true,
  emailWhitelist: ["example.com", "gmail.com"],
  emailBlacklist: ["spam.com", "temp-mail.org"],
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState(mockUsers)
  const [links, setLinks] = useState(mockLinks)
  const [userGroups, setUserGroups] = useState(mockUserGroups)
  const [siteSettings, setSiteSettings] = useState(mockSiteSettings)
  const [searchTerm, setSearchTerm] = useState("")

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleToggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "active" ? "suspended" : "active",
          }
        }
        return user
      }),
    )
  }

  const handleDeleteLink = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter((link) => link.id !== id))
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredLinks = links.filter(
    (link) =>
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Manage users, links, and site settings." />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter((u) => u.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{links.length}</div>
                <p className="text-xs text-muted-foreground">
                  {links.filter((l) => !l.expiresAt || new Date(l.expiresAt) > new Date()).length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{links.reduce((sum, link) => sum + link.clicks, 0)}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Groups</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userGroups.length}</div>
                <p className="text-xs text-muted-foreground">Configured groups</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <Select defaultValue={user.userGroup}>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {userGroups.map((group) => (
                              <SelectItem key={group.id} value={group.name}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.linksCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                            <span className="sr-only">{user.status === "active" ? "Suspend" : "Activate"}</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "links" && (
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>Manage all short links in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short Code</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{link.shortCode}</span>
                          {link.hasPassword && <Lock className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{link.originalUrl}</TableCell>
                      <TableCell>{link.username}</TableCell>
                      <TableCell>{formatDate(link.createdAt)}</TableCell>
                      <TableCell>{formatDate(link.expiresAt)}</TableCell>
                      <TableCell>{link.clicks}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteLink(link.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure general site settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                  <Switch
                    id="allowRegistration"
                    checked={siteSettings.allowRegistration}
                    onCheckedChange={(checked) => setSiteSettings({ ...siteSettings, allowRegistration: checked })}
                  />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email whitelist and blacklist.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailWhitelist">Email Whitelist (one domain per line)</Label>
                  <textarea
                    id="emailWhitelist"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={siteSettings.emailWhitelist.join("\n")}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, emailWhitelist: e.target.value.split("\n").filter(Boolean) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailBlacklist">Email Blacklist (one domain per line)</Label>
                  <textarea
                    id="emailBlacklist"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={siteSettings.emailBlacklist.join("\n")}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, emailBlacklist: e.target.value.split("\n").filter(Boolean) })
                    }
                  />
                </div>
                <Button>Save Email Settings</Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Groups</CardTitle>
                <CardDescription>Configure user groups and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Max Links</TableHead>
                      <TableHead>Expiration Options</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Transition Page</TableHead>
                      <TableHead>Custom Suffix</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.maxLinks}</TableCell>
                        <TableCell>
                          {group.expirationOptions.includes("never")
                            ? "All options"
                            : `Up to ${Math.max(...group.expirationOptions.map(Number))} days`}
                        </TableCell>
                        <TableCell>{group.canUsePassword ? "Yes" : "No"}</TableCell>
                        <TableCell>{group.canUseTransitionPage ? "Yes" : "No"}</TableCell>
                        <TableCell>{group.canUseCustomSuffix ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button className="mt-4">Add User Group</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

