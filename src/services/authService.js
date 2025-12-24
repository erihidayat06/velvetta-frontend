import api from './api.js'

export const authService = {
  async login(email, password) {
    const response = await api.post('/users/login', { email, password })
    return response.data
  },

  async register(userData) {
    const response = await api.post('/users/register', userData)
    return response.data
  },

  async getProfile() {
    const response = await api.get('/users/profile')
    return response.data
  }
}

