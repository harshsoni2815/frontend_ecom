# React Product Store - Complete Documentation

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Login Credentials
- **Username**: `user`
- **Password**: `password`

### Build for Production
```bash
npm run build
```

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI Framework |
| Vite | 5.4.10 | Build Tool |
| React Router | 6.22.0 | Routing |
| TanStack Query | 5.22.2 | Data Fetching & Caching |
| Axios | 1.6.7 | HTTP Client |
| Tailwind CSS | 3.4.1 | Styling |

---

## Project Structure

```
src/
├── api/
│   └── products.js         # API endpoints and Axios configuration
├── components/
│   ├── ProductCard.jsx     # Product display card
│   ├── ProductDetailModal.jsx  # Product detail popup
│   ├── EditProductForm.jsx     # Product edit form
│   └── DeleteConfirmation.jsx  # Delete confirmation dialog
├── context/
│   └── AuthContext.jsx     # Authentication state management
├── hooks/
│   └── useProducts.js      # React Query custom hooks
├── pages/
│   ├── Login.jsx          # Login page
│   └── ProductList.jsx    # Main product listing page
├── App.jsx                # Root component with routing
├── main.jsx               # Entry point
└── index.css              # Global styles + Tailwind
```

---

## Key Features Implemented

### 1. Authentication
- **File**: `src/context/AuthContext.jsx`, `src/pages/Login.jsx`
- Simple username/password authentication
- Session persistence using `sessionStorage`
- Protected routes

### 2. Product Management
- **List View**: Display all products in responsive grid
- **Detail View**: Modal with complete product information
- **Update**: Edit product details (title, price, description, category, image)
- **Delete**: Remove products with confirmation dialog

### 3. Search & Filter
- **Search**: Real-time search by product name
- **Filter**: Filter by category
- **Results Count**: Shows number of filtered products

### 4. Data Management (React Query)
- **Caching**: 5-minute stale time, 10-minute cache time
- **Auto-refresh**: Refetches data when window regains focus
- **Optimistic Updates**: UI updates immediately, syncs with server
- **Cache Invalidation**: Automatic cache updates on mutations

---

## How It Works

### Data Flow

```
User Action → Component → React Query Hook → API Call
                ↓
        Update UI (Optimistic)
                ↓
        Server Response → Update Cache → Re-render
```

### Authentication Flow

```
Login Form → AuthContext.login() → Validation
    ↓
sessionStorage.setItem('isLoggedIn', 'true')
    ↓
Navigate to ProductList (Protected Route)
```

### Product Update Flow

```
Edit Form → useUpdateProduct() → API PUT Request
    ↓
Optimistic Update (immediate UI change)
    ↓
Server Response → Invalidate Cache → Background Refetch
```

---

## API Integration

**Base URL**: `https://fakestoreapi.com`

### Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Fetch all products |
| GET | `/products/:id` | Fetch single product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |
| GET | `/products/categories` | Fetch all categories |

### Example: Fetch Products

```javascript
// src/hooks/useProducts.js
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAllProducts,
    staleTime: 1000 * 60 * 5,  // 5 minutes
  })
}

// Usage in component
const { data: products, isLoading, error } = useProducts()
```

---

## Component Details

### ProductList Component
**Purpose**: Main page displaying all products

**Key Features**:
- Fetches products using `useProducts()` hook
- Search and filter functionality
- Responsive grid layout (1-4 columns)
- Loading, error, and empty states

**State**:
```javascript
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState('all')
const [selectedProductId, setSelectedProductId] = useState(null)
```

**Computed Values**:
```javascript
const filteredProducts = useMemo(() => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })
}, [products, searchQuery, selectedCategory])
```

### ProductCard Component
**Purpose**: Display individual product in grid

**Props**:
- `product`: Product object
- `onClick`: Handler for card click

**Features**:
- Product image with zoom on hover
- Price formatting using `Intl.NumberFormat`
- Category badge
- Rating display
- Gradient effects

### ProductDetailModal Component
**Purpose**: Show detailed product information

**Props**:
- `productId`: ID of product to display
- `onClose`: Handler to close modal
- `onDeleted`: Handler when product is deleted

**Features**:
- Fetches individual product data
- Toggle between view and edit modes
- Delete confirmation dialog
- Animated entrance/exit

### EditProductForm Component
**Purpose**: Edit product details

**Props**:
- `product`: Product object to edit
- `onSuccess`: Handler on successful update
- `onCancel`: Handler to cancel editing

**Form Fields**:
```javascript
{
  title: string,
  price: number,
  description: string,
  category: string,
  image: string (URL)
}
```

**Features**:
- Controlled form inputs
- Live image preview
- Loading states
- Error handling

---

## Styling System

### Tailwind CSS

**Colors**:
- Primary: Blue tones (`primary-50` to `primary-900`)
- Semantic: Green (success), Red (error), Yellow (warning)

**Gradients**:
```jsx
<div className="bg-gradient-to-r from-primary-600 to-primary-700">
<h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
```

**Custom Classes** (src/index.css):
```css
.btn-primary       /* Gradient button */
.btn-secondary     /* Outlined button */
.btn-danger        /* Red delete button */
.input-field       /* Styled input */
.card              /* White card with shadow */
```

**Animations**:
```css
.animate-blob      /* Floating background */
.animate-shake     /* Error shake */
.animate-fadeIn    /* Fade in */
.animate-slideUp   /* Slide up */
```

### Responsive Design

**Breakpoints**:
- `sm:` - 640px (tablets)
- `md:` - 768px (tablets)
- `lg:` - 1024px (laptops)
- `xl:` - 1280px (desktops)

**Grid Layout**:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```
- Mobile: 1 column
- Tablet: 2 columns
- Laptop: 3 columns
- Desktop: 4 columns

---

## Performance Optimizations

### 1. React Query Caching
- **Stale Time**: 5 minutes (no refetch during this period)
- **Cache Time**: 10 minutes (data kept in memory)
- **Window Focus**: Auto-refetch when tab becomes active

### 2. Code Splitting
```javascript
// vite.config.js
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom', 'react-router-dom'],
      query: ['@tanstack/react-query'],
    }
  }
}
```

### 3. Image Lazy Loading
```jsx
<img src={product.image} loading="lazy" alt={product.title} />
```

### 4. Memoization
```javascript
const filteredProducts = useMemo(() => {
  // Expensive computation
  return products.filter(/* ... */)
}, [products, searchQuery, selectedCategory])
```

### 5. Optimistic Updates
```javascript
onSuccess: (data, variables) => {
  // Update cache immediately
  queryClient.setQueryData(['product', variables.id], data)
}
```

---

## Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Drag 'dist' folder to app.netlify.com/drop
```

### Option 3: Docker
```bash
docker build -t react-product-store .
docker run -p 8080:80 react-product-store
```

### Option 4: GitHub Pages
```bash
npm install -D gh-pages
# Add to package.json: "deploy": "npm run build && gh-pages -d dist"
npm run deploy
```

**Configuration Files**:
- `vercel.json` - Vercel deployment
- `netlify.toml` - Netlify deployment
- `Dockerfile` + `nginx.conf` - Docker deployment

---

## Environment Setup

### Required Software
- Node.js 18+ and npm
- Git (optional, for version control)

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Troubleshooting

### Port 3000 already in use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

### Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build fails
Check Node.js version:
```bash
node -v  # Should be 18+
```

---

## File Descriptions

### Configuration Files

**package.json**
- Project dependencies
- npm scripts
- Project metadata

**vite.config.js**
- Vite build configuration
- Development server settings
- Build optimizations

**tailwind.config.js**
- Tailwind CSS configuration
- Custom color palette
- Theme extensions

**postcss.config.js**
- PostCSS configuration
- Tailwind and Autoprefixer setup

**.eslintrc.cjs**
- ESLint configuration
- Code quality rules

**.gitignore**
- Files to exclude from Git

### Deployment Files

**vercel.json**
- Vercel deployment configuration
- SPA routing setup

**netlify.toml**
- Netlify deployment configuration
- Build command and publish directory

**Dockerfile**
- Multi-stage Docker build
- Production-ready container

**nginx.conf**
- Nginx server configuration
- Gzip compression
- SPA fallback routing

---

## Best Practices Used

✅ **Component-Based Architecture**: Reusable, maintainable components
✅ **Custom Hooks**: Encapsulated logic (useProducts, useAuth)
✅ **TypeScript Ready**: Can add TypeScript easily
✅ **Responsive Design**: Mobile-first approach
✅ **Performance**: Memoization, lazy loading, code splitting
✅ **Error Handling**: Loading, error, and empty states
✅ **Accessibility**: Focus states, keyboard navigation
✅ **Clean Code**: Consistent naming, clear structure
✅ **Documentation**: Well-documented codebase

---

## Summary

This React application demonstrates:

- **Modern React Patterns**: Hooks, Context, Custom Hooks
- **Efficient State Management**: React Query for server state
- **Responsive UI**: Tailwind CSS with custom design system
- **Performance**: Caching, optimistic updates, code splitting
- **User Experience**: Smooth animations, loading states, error handling
- **Production Ready**: Build optimization, deployment configs

The codebase follows React best practices and is ready for deployment to any platform.
