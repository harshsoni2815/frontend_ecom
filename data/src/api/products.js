import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productsApi = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Update product using fetch
  updateProduct: async ({ id, data }) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`)
    }

    return await response.json()
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/products/categories')
    return response.data
  },
}

export default api
