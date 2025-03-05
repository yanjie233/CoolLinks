"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { LuMoreHorizontal, LuTrash, LuPencil, LuCopy, LuExternalLink } from "react-icons/lu"

// Mock data for demonstration
const links = [
  {
    id: 1,
    slug: "product-launch",
    destination: "https://example.com/our-amazing-new-product-launch-details-and-information",
    createdAt: new Date("2023-05-10"),
    expiresAt: new Date("2023-06-10"),
    clicks: 145,
    password: true,
    showInterstitial: true,
  },
  {
    id: 2,
    slug: "summer-sale",
    destination: "https://example.com/summer-sale-2023",
    createdAt: new Date("2023-05-15"),
    expiresAt: null,
    clicks: 289,
    password: false,
    showInterstitial: true,
  },
  {
    id: 3,
    slug: "newsletter",
    destination: "https://example.com/signup-for-newsletter",
    createdAt: new Date("2023-04-20"),
    expiresAt: new Date("2023-07-20"),
    clicks: 56,
    password: false,
    showInterstitial: false,
  },
]

export function LinksTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/l/${slug}`)
    toast({
      title: "Link copied",
      description: "The short link has been copied to your clipboard",
    })
  }

  const deleteLink = (id: number) => {
    setIsLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Link deleted",
        description: "The short link has been deleted",
      })
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Short URL</TableHead>
            <TableHead className="max-w-[200px]">Destination</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="hidden md:table-cell">Expires</TableHead>
            <TableHead className="text-center">Clicks</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">{link.slug}</TableCell>
              <TableCell className="max-w-[200px] truncate" title={link.destination}>
                {link.destination}
              </TableCell>
              <TableCell className="hidden md:table-cell">{format(link.createdAt, "MMM dd, yyyy")}</TableCell>
              <TableCell className="hidden md:table-cell">
                {link.expiresAt ? format(link.expiresAt, "MMM dd, yyyy") : "Never"}
              </TableCell>
              <TableCell className="text-center">{link.clicks}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {link.password && <Badge variant="secondary">Password</Badge>}
                  {link.showInterstitial && <Badge variant="outline">Interstitial</Badge>}
                  {!link.expiresAt && <Badge className="bg-green-500 hover:bg-green-600">Permanent</Badge>}
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
                    <DropdownMenuItem onClick={() => copyToClipboard(link.slug)}>
                      <LuCopy className="mr-2 h-4 w-4" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={link.destination} target="_blank" rel="noopener noreferrer">
                        <LuExternalLink className="mr-2 h-4 w-4" />
                        Visit destination
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={`/dashboard/links/${link.id}/edit`}>
                        <LuPencil className="mr-2 h-4 w-4" />
                        Edit
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteLink(link.id)}
                      disabled={isLoading}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LuTrash className="mr-2 h-4 w-4" />
                      Delete
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

