import { RouterProvider } from 'react-router-dom'
import { createAppRouter } from './router'

export const App = () => {
  const router = createAppRouter()
  return <RouterProvider router={router} />
}

export default App;