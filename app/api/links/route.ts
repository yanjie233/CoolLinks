import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { nanoid } from "nanoid"
import { z } from "zod"
import { getUserFromRequest } from "@/lib/auth"
import { isUserAllowedToCreateLink } from "@/lib/permissions"

const createLinkSchema = z.object({
  destination: z.string().url(),
  customSlug: z.string().optional(),
  expirationDays: z.number().int().optional(),
  password: z.string().optional(),
  showInterstitial: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createLinkSchema.parse(body)

    // Check if user is allowed to create a link with these settings
    const permissionCheck = await isUserAllowedToCreateLink(user.id, {
      hasPassword: !!validatedData.password,
      hasCustomSlug: !!validatedData.customSlug,
      showInterstitial: validatedData.showInterstitial,
      expirationDays: validatedData.expirationDays,
    })

    if (!permissionCheck.allowed) {
      return NextResponse.json({ error: permissionCheck.reason }, { status: 403 })
    }

    // Create Supabase client
    const supabase = createClient()

    // Generate a slug if not provided
    const slug = validatedData.customSlug || nanoid(8)

    // Calculate expiration date
    let expiresAt = null
    if (validatedData.expirationDays) {
      expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + validatedData.expirationDays)
    }

    // Create link in the database
    const { data, error } = await supabase
      .from("links")
      .insert({
        user_id: user.id,
        slug,
        destination: validatedData.destination,
        password: validatedData.password || null,
        show_interstitial: validatedData.showInterstitial,
        expires_at: expiresAt,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createClient()

    // Fetch links for the current user
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

