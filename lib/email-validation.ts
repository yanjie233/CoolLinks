import { createClient } from "./supabase/server"

// Check if the email domain is allowed (whitelist) or blocked (blacklist)
export async function isAllowedEmail(email: string): Promise<boolean> {
  try {
    // Extract the domain from the email
    const domain = email.split("@")[1].toLowerCase()

    // Get the email settings from the database
    const supabase = createClient()
    const { data } = await supabase.from("settings").select("value").eq("key", "email_settings").single()

    if (!data) {
      // If no settings are found, allow all emails by default
      return true
    }

    const emailSettings = JSON.parse(data.value)

    // Check if the domain is in the blocked domains list
    if (emailSettings.blockedDomains && emailSettings.blockedDomains.length > 0) {
      const blockedDomains = emailSettings.blockedDomains.map((d: string) => d.toLowerCase())
      if (blockedDomains.includes(domain)) {
        return false
      }
    }

    // Check if there's an allowlist and if the domain is in it
    if (emailSettings.allowedDomains && emailSettings.allowedDomains.length > 0) {
      const allowedDomains = emailSettings.allowedDomains.map((d: string) => d.toLowerCase())
      return allowedDomains.includes(domain)
    }

    // If there's no allowlist, allow all domains that aren't blocked
    return true
  } catch (error) {
    console.error("Error checking email allowlist:", error)
    // In case of error, default to allowing the email
    return true
  }
}

