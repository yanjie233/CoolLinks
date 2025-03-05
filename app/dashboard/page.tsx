"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { LinkIcon, Plus, ExternalLink, Copy, Trash2, Edit, Lock, Eye, Clock } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data for links
const mockLinks = [
  {
    id: "1",
    originalUrl: "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing/and/tracking",
    shortCode: "ex1abc",
    createdAt: "2025-02-28T12:00:00Z",
    expiresAt: "2025-03-28T12:00:00Z",
    clicks: 245,
    hasPassword: true,
    showTransitionPage: true,
    isCustom: false,
  },
  {
    id: "2",
    originalUrl: "https://anotherexample.com/blog/how-to-create-short-links",
    shortCode: "blog123",
    createdAt: "2025-03-01T14:30:00Z",
    expiresAt: null,
    clicks: 78,
    hasPassword: false,
    showTransitionPage: true,
    isCustom: true,
  },
  {
    id: "3",
    originalUrl: "https://docs.example.com/api/reference/v2",
    shortCode: "api-docs",
    createdAt: "2025-03-03T09:15:00Z",
    expiresAt: "2025-04-03T09:15:00Z",
    clicks: 132,
    hasPassword: false,
    showTransitionPage: false,
    isCustom: true,
  },
]

export default function Dashboard() {
  const [links, setLinks] = useState(mockLinks)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newLink, setNewLink] = useState({
    originalUrl: "",
    customCode: "",
    expiration: "7",
    hasPassword: false,
    password: "",
    showTransitionPage: true,
  })

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate URL
    if (!newLink.originalUrl) {
      alert("Please enter a URL")
      return
    }

    // Create new link
    const shortCode = newLink.customCode || generateRandomCode()
    const now = new Date()
    const expiresAt =
      newLink.expiration === "never"
        ? null
        : new Date(now.getTime() + Number.parseInt(newLink.expiration) * 24 * 60 * 60 * 1000).toISOString()

    const createdLink = {
      id: Math.random().toString(36).substring(2, 9),
      originalUrl: newLink.originalUrl,
      shortCode,
      createdAt: now.toISOString(),
      expiresAt,
      clicks: 0,
      hasPassword: newLink.hasPassword,
      showTransitionPage: newLink.showTransitionPage,
      isCustom: !!newLink.customCode,
    }

    setLinks([createdLink, ...links])
    setShowCreateForm(false)
    setNewLink({
      originalUrl: "",
      customCode: "",
      expiration: "7",
      hasPassword: false,
      password: "",
      showTransitionPage: true,
    })
  }

  const handleDeleteLink = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter((link) => link.id !== id))
    }
  }

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8)
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`https://coollinks.com/${text}`)
    alert("Link copied to clipboard!")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="My Links" text="Create and manage your short links.">
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DashboardHeader>

      <div className="grid gap-4">
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Link</CardTitle>
              <CardDescription>Shorten a URL and customize its settings</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateLink}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="originalUrl">Original URL</Label>
                  <Input
                    id="originalUrl"
                    placeholder="https://example.com/your-long-url"
                    value={newLink.originalUrl}
                    onChange={(e) => setNewLink({ ...newLink, originalUrl: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customCode">Custom Code (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">coollinks.com/</span>
                    <Input
                      id="customCode"
                      placeholder="your-custom-code"
                      value={newLink.customCode}
                      onChange={(e) => setNewLink({ ...newLink, customCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration</Label>
                  <Select
                    value={newLink.expiration}
                    onValueChange={(value) => setNewLink({ ...newLink, expiration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hasPassword">Password Protection</Label>
                    <Switch
                      id="hasPassword"
                      checked={newLink.hasPassword}
                      onCheckedChange={(checked) => setNewLink({ ...newLink, hasPassword: checked })}
                    />
                  </div>

                  {newLink.hasPassword && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={newLink.password}
                        onChange={(e) => setNewLink({ ...newLink, password: e.target.value })}
                        required={newLink.hasPassword}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showTransitionPage">Show Transition Page</Label>
                  <Switch
                    id="showTransitionPage"
                    checked={newLink.showTransitionPage}
                    onCheckedChange={(checked) => setNewLink({ ...newLink, showTransitionPage: checked })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Link</Button>
              </CardFooter>
            </form>
          </Card>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Links</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <LinksList links={links} onDelete={handleDeleteLink} onCopy={copyToClipboard} />
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <LinksList
              links={links.filter((link) => !link.expiresAt || new Date(link.expiresAt) > new Date())}
              onDelete={handleDeleteLink}
              onCopy={copyToClipboard}
            />
          </TabsContent>
          <TabsContent value="expired" className="mt-4">
            <LinksList
              links={links.filter((link) => link.expiresAt && new Date(link.expiresAt) <= new Date())}
              onDelete={handleDeleteLink}
              onCopy={copyToClipboard}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function LinksList({
  links,
  onDelete,
  onCopy,
}: {
  links: typeof mockLinks
  onDelete: (id: string) => void
  onCopy: (code: string) => void
}) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <LinkIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No links found</h3>
        <p className="text-sm text-muted-foreground mt-1">Create your first short link to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Card key={link.id}>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg truncate">
                    <a
                      href={`https://coollinks.com/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center"
                    >
                      coollinks.com/{link.shortCode}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </h3>
                  {link.hasPassword && <Lock className="h-4 w-4 text-muted-foreground" />}
                  {link.showTransitionPage && <Eye className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground truncate">{link.originalUrl}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Expires: {formatDate(link.expiresAt)}
                  </div>
                  <div>Clicks: {link.clicks}</div>
                  <div>Created: {formatDate(link.createdAt)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => onCopy(link.shortCode)}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit link</span>
                </Button>
                <Button variant="outline" size="icon" onClick={() => onDelete(link.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete link</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

