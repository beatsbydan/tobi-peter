import axios from 'axios'

/**
 * Shared axios instance + auth-token store, replacing the pattern of every Context
 * provider/Validate*.jsx file building its own `${import.meta.env.VITE_BASE_URL}/...`
 * string and repeating the same headers. Framework-agnostic on purpose (no React import)
 * so it can be used from query/mutation hooks without a component tree dependency.
 */

const baseURL = import.meta.env.VITE_BASE_URL

let accessToken = null

export function setAccessToken(token) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export const apiClient = axios.create({ baseURL })

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let refreshPromise = null

export function refreshAccessToken() {
  // Deliberately a plain axios call (not `apiClient`) to avoid re-entering these interceptors.
  return axios
    .get(`${baseURL}/admin/refresh`, { withCredentials: true })
    .then((response) => {
      setAccessToken(response.data.token)
      return response.data.token
    })
    .finally(() => {
      refreshPromise = null
    })
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (response?.status !== 401 || config._retried) {
      throw error
    }
    config._retried = true

    refreshPromise ??= refreshAccessToken()
    try {
      const token = await refreshPromise
      config.headers.Authorization = `Bearer ${token}`
      return apiClient(config)
    } catch (refreshError) {
      setAccessToken(null)
      throw refreshError
    }
  },
)
