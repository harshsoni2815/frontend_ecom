# Deployment Guide

This guide provides step-by-step instructions for deploying your React Product Store application to various platforms.

## Prerequisites

Before deploying, ensure you have:
- Completed development and tested the application locally
- Built the production version: `npm run build`
- All tests passing (if applicable)

## Deployment Options

### Option 1: Vercel (Easiest & Recommended)

Vercel offers the simplest deployment process with automatic builds and deployments.

#### Method A: Using Vercel CLI

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - First deployment will ask for project settings (use defaults)
   - Subsequent deployments: just run `vercel --prod`

4. **Your app is live!** Vercel will provide a URL like `https://your-app.vercel.app`

#### Method B: Using Vercel Dashboard (No CLI)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Vercel auto-detects Vite settings
5. Click "Deploy"
6. Done! Auto-deploys on every git push

---

### Option 2: Netlify

Netlify is another excellent option with great free tier.

#### Method A: Using Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize site:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

#### Method B: Drag & Drop

1. Build your app: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Done! Instant deployment

#### Method C: Git Integration

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Build settings are auto-detected from `netlify.toml`
5. Click "Deploy site"

---

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `vite.config.js`:**
   ```javascript
   export default defineConfig({
     base: '/your-repository-name/',  // Replace with your repo name
     plugins: [react()],
     // ... rest of config
   })
   ```

3. **Add deploy script to `package.json`:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Select `gh-pages` branch
   - Your site will be at: `https://yourusername.github.io/repository-name/`

---

### Option 4: Docker Deployment

Deploy as a containerized application on any platform supporting Docker.

#### Build and Run Locally

```bash
# Build the Docker image
docker build -t react-product-store .

# Run the container
docker run -p 8080:80 react-product-store

# Access at http://localhost:8080
```

#### Deploy to Docker Hub

```bash
# Tag your image
docker tag react-product-store yourusername/react-product-store:latest

# Push to Docker Hub
docker push yourusername/react-product-store:latest
```

#### Deploy to Cloud Platforms

**AWS ECS / Azure Container Instances / Google Cloud Run:**
1. Push image to container registry
2. Create container instance
3. Configure port 80
4. Deploy

**DigitalOcean App Platform:**
1. Go to App Platform
2. Select Docker Hub or container registry
3. Enter image name
4. Deploy

---

### Option 5: AWS S3 + CloudFront

Static website hosting with CDN.

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create bucket with public access
   - Enable static website hosting

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Set bucket policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::your-bucket-name/*"
     }]
   }
   ```

5. **Optional: Add CloudFront CDN:**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure cache behaviors

---

### Option 6: Render

1. Go to [render.com](https://render.com)
2. Click "New Static Site"
3. Connect your Git repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Create Static Site"

---

### Option 7: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Railway auto-detects the configuration
5. Click "Deploy"

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test the login functionality (user/password)
- [ ] Verify product list loads correctly
- [ ] Test product detail modal
- [ ] Test edit product functionality
- [ ] Test delete product with confirmation
- [ ] Verify search functionality works
- [ ] Test category filtering
- [ ] Check responsive design on mobile
- [ ] Test window focus revalidation (switch tabs and return)
- [ ] Check browser console for errors

## Environment Variables

This application doesn't require environment variables by default. If you add any:

**Vercel/Netlify:**
- Add in dashboard under "Environment Variables"

**GitHub Pages:**
- Use build-time variables in `vite.config.js`

**Docker:**
- Pass with `-e` flag: `docker run -e VAR_NAME=value ...`

## Troubleshooting

### Routes return 404 on refresh
- Ensure rewrites/redirects are configured (included in config files)
- For GitHub Pages, may need custom 404.html

### Build fails
- Check Node.js version (requires 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for missing dependencies

### API calls fail
- Check CORS settings
- Verify network requests in browser DevTools
- Fake Store API should work without authentication

## Custom Domain

Most platforms support custom domains:

**Vercel/Netlify:**
1. Go to project settings → Domains
2. Add custom domain
3. Update DNS records as instructed

**GitHub Pages:**
1. Add CNAME file to `public/` directory
2. Add custom domain in repository settings

## Cost Comparison

| Platform | Free Tier | Best For |
|----------|-----------|----------|
| Vercel | Yes (generous) | Modern web apps |
| Netlify | Yes (generous) | Static sites |
| GitHub Pages | Yes (unlimited) | Open source projects |
| Render | Yes (limited) | Full-stack apps |
| Railway | Yes (limited) | Quick deployments |
| AWS S3 | Pay per use | Large scale |
| Docker (VPS) | Varies by provider | Full control |

## Recommended Workflow

1. **Development**: Work locally with `npm run dev`
2. **Testing**: Build locally with `npm run build` and test with `npm run preview`
3. **Version Control**: Commit to Git
4. **Deployment**: Push to main branch (auto-deploy on Vercel/Netlify)
5. **Monitoring**: Check deployment logs and live site

## Need Help?

- Check platform-specific documentation
- Review build logs in deployment dashboard
- Test locally first: `npm run build && npm run preview`

---

**Congratulations! Your React Product Store is now deployed and ready to use!**
