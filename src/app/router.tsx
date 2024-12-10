import { createBrowserRouter } from 'react-router-dom'
import { Login } from '@/pages/login'
import { Main } from '@/pages/main'
import { Profile } from '@/pages/profile'
import { Shareroom } from '@/pages/shareroom'
import { Character } from '@/pages/character'
import { Error404Page } from '@/pages/_error'
import { Layout } from '@/pages/_layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Login /></Layout>,
    errorElement: <Error404Page />
  },
  {
    path: '/main',
    element: <Layout><Main /></Layout>,
    errorElement: <Error404Page />
  },
  {
    path: '/@me',
    element: <Layout><Profile /></Layout>,
    errorElement: <Error404Page />
  },
  {
    path: '/shareroom/:shareroomId',
    element: <Layout><Shareroom /></Layout>,
    errorElement: <Error404Page />
  },
  {
    path: '/character',
    element: <Layout><Character /></Layout>,
    errorElement: <Error404Page />
  }
])
