import { AuthDto } from '@/entities/auth/model/dtos'
import { apiClient } from '@/shared/api/httpClient'
import { ApiResponse } from '@/shared/api/types'

export const discordApi = {
    async login(code: string): Promise<ApiResponse<AuthDto>> {
        return apiClient.post('/auth/discord/login', { code }, { skipAuth: true })
    },
} 