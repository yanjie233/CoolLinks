import { createClient } from "./supabase/server"

// Check if a user is an admin
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const supabase = createClient()

    const { data } = await supabase
      .from("user_groups")
      .select("name")
      .eq("id", supabase.from("users").select("user_group_id").eq("id", userId).single())
      .single()

    return data?.name === "Admin"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Check if a user is allowed to create a link with specific settings
export async function isUserAllowedToCreateLink(
  userId: string,
  settings: {
    hasPassword?: boolean
    hasCustomSlug?: boolean
    showInterstitial?: boolean
    expirationDays?: number
  },
): Promise<{ allowed: boolean; reason?: string }> {
  try {
    const supabase = createClient()

    // Get the user's group
    const { data: userData } = await supabase
      .from("users")
      .select("user_group_id, total_links")
      .eq("id", userId)
      .single()

    if (!userData) {
      return { allowed: false, reason: "User not found" }
    }

    // Get the user group's settings
    const { data: groupData } = await supabase.from("user_groups").select("*").eq("id", userData.user_group_id).single()

    if (!groupData) {
      return { allowed: false, reason: "User group not found" }
    }

    // Check link limit
    if (groupData.link_limit !== -1 && userData.total_links >= groupData.link_limit) {
      return { allowed: false, reason: "You have reached your maximum number of links" }
    }

    // Check if password protection is allowed
    if (settings.hasPassword && !groupData.can_use_password) {
      return { allowed: false, reason: "Password protection is not available in your plan" }
    }

    // Check if custom slugs are allowed
    if (settings.hasCustomSlug && !groupData.can_use_custom_slug) {
      return { allowed: false, reason: "Custom URL slugs are not available in your plan" }
    }

    // Check if interstitial pages are allowed
    if (settings.showInterstitial && !groupData.can_use_interstitial) {
      return { allowed: false, reason: "Interstitial pages are not available in your plan" }
    }

    // Check if the expiration period is allowed
    if (settings.expirationDays !== undefined) {
      const allowedPeriods = JSON.parse(groupData.expiration_options || "[]")
      if (allowedPeriods.length > 0 && settings.expirationDays !== 0) {
        // Check if the exact expiration period is allowed
        if (!allowedPeriods.includes(settings.expirationDays)) {
          return { allowed: false, reason: "This expiration period is not available in your plan" }
        }
      }
    }

    return { allowed: true }
  } catch (error) {
    console.error("Error checking link creation permissions:", error)
    return { allowed: false, reason: "An error occurred while checking permissions" }
  }
}

