# React Product Store

A high-performance React application that displays and manages product data from the Fake Store API.

## Features

- **User Authentication**: Simple login page with session persistence
- **Product List**: Grid view of all products with images, prices, and categories
- **Product Details**: Detailed view with ratings and complete descriptions
- **Update Products**: Edit product information with real-time cache updates
- **Delete Products**: Remove products with confirmation dialog
- **Search & Filter**: Search by name and filter by category
- **Optimized Performance**: React Query for efficient caching and state management
- **Auto-refresh**: Data revalidates when window regains focus

## Tech Stack

- **React 18** - UI framework
- **React Router** - Routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Login Credentials

- **Username**: `user`
- **Password**: `password`

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment Options

### 1. Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 2. Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

Or drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop).

### 3. GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

### 4. Docker

Build and run with Docker:

```bash
# Build image
docker build -t react-product-store .

# Run container
docker run -p 8080:80 react-product-store
```

Access at [http://localhost:8080](http://localhost:8080)

### 5. Static Hosting (AWS S3, Azure, etc.)

Simply upload the contents of the `dist` folder to your static hosting service.

## Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable components
├── context/          # React Context (Auth)
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Key Features Implementation

### React Query Configuration
- Automatic refetch on window focus
- Smart caching with 5-minute stale time
- Optimistic updates for mutations
- Cache invalidation on updates/deletes

### State Management
- Session Storage for auth persistence
- React Query for server state
- React Context for auth state

### Performance Optimizations
- Lazy loading images
- Memoized filters and search
- Code splitting
- Minified production build

## API Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/categories` - Fetch categories

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
