import { User } from "./types"

export interface LoginDto {
    code: string
    provider: 'discord'
}

export interface AuthDto {
    accessToken: string
    user: User
}