const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!

export function getOAuthUrl() {
  const redirectUri = `${window.location.origin}/oauth/callback`
  return `${API_BASE_URL}/auth/oauth-redirect?callbackUrl=${encodeURIComponent(redirectUri)}`
}
