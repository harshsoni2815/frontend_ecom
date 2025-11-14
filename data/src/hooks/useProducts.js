import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products'

// Query keys
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  CATEGORIES: 'categories',
}

// Get all products
export function useProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: productsApi.getAllProducts,
  })
}

// Get single product
export function useProduct(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  })
}

// Update product mutation
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: (data, variables) => {
      // Update the cache for the specific product
      queryClient.setQueryData([QUERY_KEYS.PRODUCT, variables.id], data)

      // Update the product in the products list cache
      queryClient.setQueryData([QUERY_KEYS.PRODUCTS], (oldData) => {
        if (!oldData) return oldData
        return oldData.map((product) =>
          product.id === variables.id ? { ...product, ...data } : product
        )
      })

      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, variables.id] })
    },
  })
}

// Delete product mutation
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: (data, productId) => {
      // Remove the product from the cache
      queryClient.setQueryData([QUERY_KEYS.PRODUCTS], (oldData) => {
        if (!oldData) return oldData
        return oldData.filter((product) => product.id !== productId)
      })

      // Remove the specific product query
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.PRODUCT, productId] })

      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] })
    },
  })
}

// Get categories
export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: productsApi.getCategories,
  })
}
