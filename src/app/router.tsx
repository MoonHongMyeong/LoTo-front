import { useAuth } from '@/features/auth/model/useAuth'
import { Layout } from '@/pages/_layout/ui/Layout'
import { DiscordCallback } from '@/pages/auth/ui/DiscordCallback'
import { Character } from '@/pages/character/ui/Character'
import { Login } from '@/pages/login/ui/Login'
import { Main } from '@/pages/main/ui/Main'
import { Profile } from '@/pages/profile/ui/Profile'
import { Shareroom } from '@/pages/shareroom/ui/Shareroom'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'
import { createBrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) {
    navigate('/login', { state: { from: window.location.pathname } })
  }

  return children
}

const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const hasAccessToken = localStorage.getItem('accessToken') !== undefined
    if (hasAccessToken) {
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    }
  }, [location.state?.from, navigate])

  return children
}

export const router = createBrowserRouter([
  {
    path: '/auth/discord/callback',
    element: <DiscordCallback />,
  },
  {
    path: '/login',
    element: <LoginRoute><Layout><Login /></Layout></LoginRoute>,
  },
  {
    path: '/',
    element: <ProtectedRoute><Layout><Main /></Layout></ProtectedRoute>,
  },
  {
    path: '/@me',
    element: <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>,
  },
  {
    path: '/shareroom/:shareroomId',
    element: <ProtectedRoute><Layout><Shareroom /></Layout></ProtectedRoute>,
  },
  {
    path: '/character',
    element: <ProtectedRoute><Layout><Character /></Layout></ProtectedRoute>,
  },
  
])
