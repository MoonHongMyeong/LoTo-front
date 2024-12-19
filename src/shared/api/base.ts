interface FetchOptions extends RequestInit {
  skipAuth?: boolean
}

const BASE_URL = 'http://localhost:8080/api/v1'

class ApiClient {
  private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options
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

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    })

    if (response.status === 401 && !skipAuth) {
      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/token/refresh`, {
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
        throw error
      }
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  public get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.fetch(endpoint, { ...options, method: 'GET' })
  }

  public post<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  public put<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  public delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.fetch(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient() 