import { AuthResponse } from '@/entities/auth'
import { discordApi } from '@/features/auth/api/discordApi'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const DiscordCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isRequesting = useRef(false)

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      console.error('code is null')
      navigate('/')
      return
    }

    const handleAuth = async () => {
      try {
        console.log("isRequesting: ", isRequesting)
        if (isRequesting.current) return
        isRequesting.current = true

        const response: AuthResponse = await discordApi.login(code)
        
        localStorage.setItem('accessToken', response.accessToken)
        navigate('/')

      } catch (error) {
        console.error('Discord auth failed:', error)
        navigate('/error')
      } finally {
      }
    }
    handleAuth()
  }, [searchParams, navigate])

  return (
    <LoadingSpinner />
  )
} 