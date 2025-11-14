import { useState } from 'react'
import { useProduct } from '../hooks/useProducts'
import EditProductForm from './EditProductForm'
import DeleteConfirmation from './DeleteConfirmation'

export default function ProductDetailModal({ productId, onClose, onDeleted }) {
  const { data: product, isLoading, error } = useProduct(productId)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleEditSuccess = () => {
    setIsEditing(false)
  }

  const handleDeleteSuccess = () => {
    setShowDeleteConfirm(false)
    onDeleted()
    onClose()
  }

  if (!productId) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="flex items-center justify-center p-16">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 mx-auto mb-4"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin rounded-full h-16 w-16 border-4 border-t-primary-600 border-r-transparent border-b-transparent border-l-transparent"></div>
              </div>
              <p className="text-gray-600 font-medium">Loading product details...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-8">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Error loading product: {error.message}</span>
            </div>
          </div>
        )}

        {product && !isEditing && (
          <div className="p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Product Details</h2>
                <p className="text-gray-500">Complete product information</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-all hover:rotate-90 duration-300 p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Product Image */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 flex items-center justify-center shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-96 object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.title}
                  </h3>
                  <span className="inline-block px-5 py-2 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 rounded-full font-semibold capitalize text-sm border border-primary-200 shadow-sm">
                    {product.category}
                  </span>
                </div>

                <div className="py-4">
                  <p className="text-sm text-gray-500 mb-2">Price</p>
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {product.rating && (
                  <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.round(product.rating.rate)
                                ? 'text-yellow-400 fill-current drop-shadow-sm'
                                : 'text-gray-300 fill-current'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-700">
                          {product.rating.rate}
                        </p>
                        <p className="text-xs text-yellow-600">out of 5</p>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-700 font-medium">
                      Based on {product.rating.count} customer reviews
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <h4 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Product
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 btn-danger shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {product && isEditing && (
          <EditProductForm
            product={product}
            onSuccess={handleEditSuccess}
            onCancel={() => setIsEditing(false)}
          />
        )}

        {showDeleteConfirm && (
          <DeleteConfirmation
            productId={productId}
            productName={product?.title}
            onConfirm={handleDeleteSuccess}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
    </div>
  )
}
