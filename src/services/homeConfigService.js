import api from './api.js'

export const homeConfigService = {
  async get() {
    const response = await api.get('/home-config')
    return response.data
  }
}

