import { defineStore } from 'pinia'
import { apiRequest } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: '',
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },
  actions: {
    async refresh() {
      try {
        const response = await apiRequest('/auth/user')
        this.user = response.data
        this.error = ''
      } catch (error) {
        if (error.status === 401) {
          this.user = null
          this.error = ''
          return
        }

        throw error
      }
    },
    async login(credentials) {
      const response = await apiRequest('/auth/login', { method: 'POST', body: credentials })
      this.user = response.data
      this.error = ''
      return response.data
    },
    async register(details) {
      const response = await apiRequest('/auth/register', { method: 'POST', body: details })
      this.user = response.data
      this.error = ''
      return response.data
    },
    async logout() {
      await apiRequest('/auth/logout', { method: 'POST' })
      this.user = null
    },
  },
})
