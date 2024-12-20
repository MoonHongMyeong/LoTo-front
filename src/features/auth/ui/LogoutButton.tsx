import { jwtAuthApi } from '@/features/auth/api/jwtAuthApi'
import { apiClient } from '@/shared/api/httpClient'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const LogoutButton = () => {
  const isRequest = useRef(false)
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    if (isRequest.current) return

    try {
      await jwtAuthApi.logout()
    } catch (error) {
      await apiClient.get("/auth/revoke", {skipAuth: true})
    } finally {
      isRequest.current = true
      localStorage.removeItem("accessToken")
      navigate("/login")
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="text-white hover:text-gray-200"
    >
      로그아웃
    </button>
  )
} 