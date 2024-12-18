import { apiClient } from '@/shared/api/base'
import { AuthResponse } from '@/entities/auth'

export const discordApi = {
    async login(code: string): Promise<AuthResponse> {
        return apiClient.post('/auth/discord/login', { code }, { skipAuth: true })
    },
} 