export interface User {
    id: number,
    nickname: string,
    apiKey: string,
    discordUsername: string,
    discordAvatar: string
}

export interface AuthResponse {
    accessToken: string,
    user: User
}

export interface RefreshTokenResponse {
    refreshToken: string
}
