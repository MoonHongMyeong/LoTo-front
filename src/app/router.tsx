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

interface RouteComponentProps {
  children: React.ReactNode
}

interface ProtectedRouteProps extends RouteComponentProps {
  redirectTo?: string
}

interface LoginRouteProps extends RouteComponentProps {
  defaultRedirect?: string
}

interface RouteConfig {
  path: string
  element: React.ReactNode
  errorElement?: React.ReactNode
}

const ProtectedRoute = ({ children, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { 
        state: { from: location.pathname },
        replace: true
      })
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, location])

  if (isLoading) return <LoadingSpinner />

  return children
}

const LoginRoute = ({ children, defaultRedirect = '/' }: LoginRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = location.state?.from || defaultRedirect
      navigate(from, { 
        replace: true
      })
    }
  }, [isAuthenticated, isLoading, navigate, location, defaultRedirect])

  if (isLoading) return <LoadingSpinner />

  return children
}

const routes: RouteConfig[] = [
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
] satisfies RouteConfig[]

export const createAppRouter = () => createBrowserRouter(routes)
