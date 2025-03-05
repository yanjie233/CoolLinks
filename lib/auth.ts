import type { NextRequest } from "next/server"
import { createClient } from "./supabase/server"

export async function getUserFromRequest(req: NextRequest) {
  const supabase = createClient()

  // Get session from cookies
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  return session.user
}

// Check if a user exists by email
export async function getUserByEmail(email: string) {
  const supabase = createClient()

  const { data } = await supabase.from("users").select("*").eq("email", email).single()

  return data
}

// Create a new user
export async function createUser(userData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("users").insert(userData).select().single()

  if (error) {
    throw error
  }

  return data
}

