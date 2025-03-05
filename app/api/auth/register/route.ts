import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendVerificationEmail } from "@/lib/email"
import { isAllowedEmail } from "@/lib/email-validation"
import { z } from "zod"

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  captcha: z.string().min(4).max(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = registerSchema.parse(body)

    // Check if the email is allowed
    if (!(await isAllowedEmail(validatedData.email))) {
      return NextResponse.json({ error: "This email domain is not allowed for registration" }, { status: 403 })
    }

    // Create Supabase client
    const supabase = createClient()

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select().eq("email", validatedData.email).single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          username: validatedData.username,
          user_group_id: 1, // Default user group
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Send verification email
    await sendVerificationEmail(validatedData.email)

    return NextResponse.json(
      { message: "Registration successful, please check your email for verification" },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

