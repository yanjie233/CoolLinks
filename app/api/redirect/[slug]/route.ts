import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  // Create Supabase client
  const supabase = createClient()

  // Find the link
  const { data: link, error } = await supabase.from("links").select("*").eq("slug", slug).single()

  if (error || !link) {
    return NextResponse.redirect(new URL("/404", req.url))
  }

  // Check if the link has expired
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/expired", req.url))
  }

  // Check if the link requires a password
  if (link.password) {
    // If password protected, redirect to the password page
    return NextResponse.redirect(new URL(`/password/${slug}`, req.url))
  }

  // Check if the link should show an interstitial page
  if (link.show_interstitial) {
    return NextResponse.redirect(new URL(`/preview/${slug}`, req.url))
  }

  // Increment the click count
  await supabase
    .from("links")
    .update({
      clicks: link.clicks + 1,
    })
    .eq("id", link.id)

  // Add click analytics
  await supabase.from("clicks").insert({
    link_id: link.id,
    ip: req.headers.get("x-forwarded-for") || "unknown",
    user_agent: req.headers.get("user-agent") || "unknown",
    referrer: req.headers.get("referer") || "unknown",
  })

  // Redirect to the destination
  return NextResponse.redirect(link.destination)
}

