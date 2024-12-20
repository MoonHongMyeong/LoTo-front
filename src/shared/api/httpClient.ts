import type { ApiClientConfig, ApiResponse, FetchOptions } from './types'

const BASE_URL = 'http://localhost:8080/api/v1'

class ApiClient {
  private baseURL: string

  constructor(config?: ApiClientConfig) {
    this.baseURL = config?.baseURL || BASE_URL
  }

  private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
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
      const refreshResponse = await fetch(`${this.baseURL}/auth/token/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json()
        localStorage.setItem('accessToken', newAccessToken)
        return this.fetch(endpoint, options)
      }

      localStorage.removeItem('accessToken')
    }

    if ( response.status === 204 ) {
      return {
        data: {} as T,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      }
    }
    const responseData = await response.json();

    return {
      data: responseData,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries())
    }
  }

  public async get<T>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' })
  }

  public async post<T>(
    endpoint: string, 
    data?: unknown, 
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
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
  ): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  public async delete<T>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient() 