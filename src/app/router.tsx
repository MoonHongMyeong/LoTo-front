import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/useAuth'
import { Login } from '@/pages/login/ui/Login'
import { Main } from '@/pages/main/ui/Main'
import { Profile } from '@/pages/profile/ui/Profile'
import { Shareroom } from '@/pages/shareroom/ui/Shareroom'
import { Character } from '@/pages/character/ui/Character'
import { Error404Page } from '@/pages/_error/ui/Error404Page'
import { Layout } from '@/pages/_layout/ui/Layout'
import { DiscordCallback } from '@/pages/auth/ui/DiscordCallback'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } })
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) return null

  return children
}

export const router = createBrowserRouter([
  {
    path: '/auth/discord/callback',
    element: <DiscordCallback />,
    errorElement: <Error404Page />
  },
  {
    path: '/',
    element: <Layout><Login /></Layout>,
    errorElement: <Error404Page />
  },
  {
    path: '/main',
    element: <ProtectedRoute><Layout><Main /></Layout></ProtectedRoute>,
    errorElement: <Error404Page />
  },
  {
    path: '/@me',
    element: <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>,
    errorElement: <Error404Page />
  },
  {
    path: '/shareroom/:shareroomId',
    element: <ProtectedRoute><Layout><Shareroom /></Layout></ProtectedRoute>,
    errorElement: <Error404Page />
  },
  {
    path: '/character',
    element: <ProtectedRoute><Layout><Character /></Layout></ProtectedRoute>,
    errorElement: <Error404Page />
  },
  
])
