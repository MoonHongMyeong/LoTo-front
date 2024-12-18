import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { discordApi } from '@/features/auth/api/discordApi'
import { AuthResponse } from '@/entities/auth'

export const DiscordCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      console.error('code is null')
      navigate('/')
      return
    }

    const handleAuth = async () => {
      try {
        const response: AuthResponse = await discordApi.login(code)
        
        localStorage.setItem('accessToken', response.accessToken)
        navigate('/main')

      } catch (error) {
        console.error('Discord auth failed:', error)
        navigate('/error')
      }
    }
    handleAuth()
  }, [searchParams, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">로그인 처리중...</div>
    </div>
  )
} 