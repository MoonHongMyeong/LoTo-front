import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiscordLoginButton } from '@/features/auth/ui/DiscordLoginButton'
import { jwtAuthApi } from '@/features/auth'
import Cookies from 'js-cookie'

export const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const silentLogin = async () => {
      const hasRefreshToken = Cookies.get('refreshToken') !== undefined
      if (hasRefreshToken) {
        try {
          const response = await jwtAuthApi.silentLogin()
          localStorage.setItem('accessToken', response.accessToken)
          navigate('/main')
        } catch (error) {
          console.log('Silent login failed, showing login page')
        }
      }
    }

    silentLogin()
  }, [navigate])

  return (
    <div className="min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-64px)] flex items-center justify-center pb-16">
      <DiscordLoginButton />
    </div>
  )
}
