import type { ApiClientConfig, ApiError, FetchOptions } from './types'

const BASE_URL = 'http://localhost:8080/api/v1'

class ApiClient {
  private baseURL: string

  constructor(config?: ApiClientConfig) {
    this.baseURL = config?.baseURL || BASE_URL
  }

  private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { skipAuth = false, params, ...fetchOptions } = options
    const accessToken = localStorage.getItem('accessToken')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (!skipAuth && accessToken) {
      Object.assign(headers, {
        'Authorization': `Bearer ${accessToken}`
      })
    }

    const queryString = params 
      ? `?${new URLSearchParams(params).toString()}`
      : ''

    const response = await fetch(`${this.baseURL}${endpoint}${queryString}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    })

    if (response.status === 401 && !skipAuth) {
      try {
        const refreshResponse = await fetch(`${this.baseURL}/auth/token/refresh`, {
          method: 'POST',
          credentials: 'include',
        })

        if (!refreshResponse.ok) {
          throw new Error('Token refresh failed')
        }

        const { accessToken: newAccessToken } = await refreshResponse.json()
        localStorage.setItem('accessToken', newAccessToken)
        
        return this.fetch(endpoint, options)
      } catch (error) {
        localStorage.removeItem('accessToken')
        throw this.handleError(error)
      }
    }

    if (!response.ok) {
      throw this.handleError(await response.json())
    }

    return response.json()
  }

  private handleError(error: any): ApiError {
    return {
      httpStatus: error.status || 500,
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      code: error.code
    }
  }

  public async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' })
  }

  public async post<T>(
    endpoint: string, 
    data?: unknown, 
    options?: FetchOptions
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  public async put<T>(
    endpoint: string, 
    data?: unknown, 
    options?: FetchOptions
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  public async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient() 