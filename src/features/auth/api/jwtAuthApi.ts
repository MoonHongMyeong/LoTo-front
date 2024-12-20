import { AuthDto } from '@/entities/auth/model/dtos'
import { ApiResponse } from '@/shared/api/types'
import { apiClient } from '@/shared/api/httpClient'

export const jwtAuthApi = {
    async silentLogin(): Promise<ApiResponse<AuthDto>> {
        return apiClient.post('/auth/login', undefined, { skipAuth: true, credentials: 'include' })
    },

    async logout(): Promise<ApiResponse<void>> {
        return apiClient.post('/auth/logout', undefined, { skipAuth: false, credentials: 'include' })
    }
}