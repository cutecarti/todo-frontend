import axios, { isAxiosError } from 'axios'
import { apiBaseUrl } from '@/shared/config/env'

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const data = error.response?.data as { error?: string } | undefined
      const message = data?.error ?? error.message
      return Promise.reject(new Error(message))
    }

    return Promise.reject(error)
  },
)
