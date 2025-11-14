export default function ProductCard({ product, onClick }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div
      onClick={onClick}
      className="group card p-5 cursor-pointer transform hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
    >
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Rating Badge */}
      {product.rating && (
        <div className="absolute top-3 right-3 z-10 bg-white shadow-md rounded-full px-3 py-1 flex items-center gap-1 border border-gray-100">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-sm font-bold text-gray-700">
            {product.rating.rate}
          </span>
        </div>
      )}

      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden group-hover:from-gray-100 group-hover:to-gray-50 transition-all duration-300">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-3 relative z-10">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 rounded-full text-xs font-semibold capitalize border border-primary-200 shadow-sm">
              {product.category}
            </span>
            {product.rating && (
              <span className="text-xs text-gray-500">
                ({product.rating.count} reviews)
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem] text-lg group-hover:text-primary-600 transition-colors duration-300">
            {product.title}
          </h3>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
