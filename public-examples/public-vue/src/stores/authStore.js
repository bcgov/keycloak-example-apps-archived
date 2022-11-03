import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authentication', {
  state: () => {
    return {
      isAuthenticated: false,
    }
  },
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    setAuthentication(authentication) {
      this.isAuthenticated = authentication || false
    },
  },
})
