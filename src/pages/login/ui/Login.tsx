import { DiscordLoginButton } from '@/features/auth/ui/DiscordLoginButton'

export const Login = () => {
  return (
    <div className="min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-64px)] flex items-center justify-center pb-16">
      <DiscordLoginButton />
    </div>
  )
}
