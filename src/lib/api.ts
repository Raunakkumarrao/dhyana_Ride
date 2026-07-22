import axios from 'axios'

// Falls back to localhost:5000 for local development if VITE_API_URL isn't set.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default api
