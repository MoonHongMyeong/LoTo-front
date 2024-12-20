import { AuthDto, useAuthStore } from '@/entities/auth'
import { discordApi } from '@/features/auth/api/discordApi'
import { ApiResponse } from '@/shared/api/types'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const DiscordCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isRequesting = useRef(false)
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      console.error('code is null')
      navigate('/')
      return
    }

    const handleAuth = async () => {
      try {
        if (isRequesting.current) return
        isRequesting.current = true

        const response: ApiResponse<AuthDto> = await discordApi.login(code)
        
        localStorage.setItem('accessToken', response.data.accessToken)
        setAuth(response.data)
        navigate('/')

      } catch (error) {
        console.error('Discord auth failed:', error)
        navigate('/error')
      }
    }
    handleAuth()
  }, [searchParams, navigate])

  return <LoadingSpinner />
} 