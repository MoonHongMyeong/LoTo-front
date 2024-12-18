import { apiClient } from '@/shared/api/base'
import { AuthResponse } from '@/entities/auth'

export const jwtAuthApi = {
    async silentLogin(): Promise<AuthResponse> {
        return apiClient.post('/auth/login', undefined, { skipAuth: true, credentials: 'include' })
    },

    async logout(): Promise<void> {
        return apiClient.post('/auth/logout', undefined, { skipAuth: false, credentials: 'include' })
    }
}