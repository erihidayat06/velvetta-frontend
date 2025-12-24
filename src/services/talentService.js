import api from './api.js'

export const talentService = {
  async getAll() {
    const response = await api.get('/talents')
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/talents/${id}`)
    return response.data
  }
}

