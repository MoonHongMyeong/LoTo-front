export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface ApiError {
    httpStatus: number
    message: string
    code: string
    errors: FieldError[]
}

export interface FieldError {
  field: string
  message: string
  reason: string
}

export interface FetchOptions extends RequestInit {
  skipAuth?: boolean
  params?: Record<string, string>
}

export interface ApiClientConfig {
  baseURL: string
  headers?: Record<string, string>
} 