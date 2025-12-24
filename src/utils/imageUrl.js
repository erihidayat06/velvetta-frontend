/**
 * Get full image URL from backend path
 * @param {string} imagePath - Relative path from backend (e.g., /uploads/products/image.webp)
 * @returns {string} - Full URL
 */
export const getImageUrl = (imagePath) => {
  // Handle null, undefined, or non-string values
  if (!imagePath) return ''
  if (typeof imagePath !== 'string') {
    console.warn('getImageUrl received non-string value:', imagePath)
    return ''
  }
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // Backend serves static files at /uploads (not /api/uploads)
  // So we need to use the base backend URL without /api
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '') // Remove /api to get base URL (http://localhost:3000)
  
  // If path starts with /uploads, use backend base URL directly (not /api)
  if (imagePath.startsWith('/uploads')) {
    return `${BACKEND_BASE_URL}${imagePath}`
  }
  
  // Otherwise, assume it's an API endpoint
  return `${API_BASE_URL}${imagePath}`
}

