export const DISCORD_CONFIG = {
  VITE_DISCORD_CLIENT_ID: import.meta.env.VITE_DISCORD_CLIENT_ID,
  VITE_DISCORD_CODE_REDIRECT_URI: import.meta.env.VITE_DISCORD_CODE_REDIRECT_URI,
  OAUTH_URL: `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_DISCORD_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    import.meta.env.VITE_DISCORD_CODE_REDIRECT_URI as string
  )}&response_type=code&scope=identify`,
} as const 