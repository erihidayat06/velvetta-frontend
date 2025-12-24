import api from './api.js'

export const blogService = {
  async getAll(limit = null) {
    const params = limit ? { limit } : {}
    const response = await api.get('/blogs', { params })
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  }
}

