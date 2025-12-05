# Deploying to Cloudflare Pages

This guide explains how to deploy Markdown Viewer to Cloudflare Pages.

## Prerequisites

1. A [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
3. Node.js 18+ installed

## Option 1: Deploy via CLI (Recommended)

### Step 1: Login to Cloudflare

```bash
npx wrangler login
```

This will open a browser for authentication.

### Step 2: Build and Deploy

```bash
npm run deploy
```

This runs `npm run build && wrangler pages deploy dist`.

### Step 3: Access Your Site

After deployment, Wrangler will output your site URL:
```
✨ Deployment complete! 
https://markdownviewer.pages.dev
```

## Option 2: Deploy via Cloudflare Dashboard

### Step 1: Connect Git Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**
2. Click **Create application** → **Pages** → **Connect to Git**
3. Select your repository

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node.js version | `18` (or higher) |

### Step 3: Environment Variables (Optional)

No environment variables are required for basic deployment.

### Step 4: Deploy

Click **Save and Deploy**. Cloudflare will:
1. Clone your repository
2. Install dependencies
3. Run `npm run build`
4. Deploy the `dist` folder

## Custom Domain Setup

### Add Custom Domain

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `markdown.yourdomain.com`)
4. Follow DNS configuration instructions

### DNS Configuration

If your domain is on Cloudflare:
- A CNAME record will be added automatically

If your domain is external:
- Add a CNAME record pointing to `<project>.pages.dev`

## Advanced Configuration

### wrangler.toml

The project includes a `wrangler.toml` configuration:

```toml
name = "markdownviewer"
compatibility_date = "2025-01-10"

[site]
bucket = "./dist"
```

### Build Cache

Cloudflare Pages automatically caches `node_modules` between builds for faster deployments.

### Preview Deployments

Every push to a non-production branch creates a preview deployment:
- URL format: `<commit-hash>.<project>.pages.dev`
- Great for testing changes before merging

## Troubleshooting

### Build Fails with "Out of Memory"

Add a `NODE_OPTIONS` environment variable:
```
NODE_OPTIONS=--max_old_space_size=4096
```

### Static Assets Not Loading

Ensure the build output directory is correctly set to `dist`.

### 404 on Client-Side Routes

For SPA routing, create a `public/_redirects` file:
```
/*    /index.html   200
```

Or use `_routes.json`:
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": []
}
```

## Continuous Deployment

With Git integration, every push to `main` branch automatically triggers a new deployment.

### Branch Deploy Rules

Configure in Dashboard → Settings → Build & deployments:
- Production branch: `main`
- Preview branches: All other branches

## Performance Tips

1. **Enable Caching**: Cloudflare Pages uses edge caching by default
2. **Optimize Images**: Use WebP format where possible
3. **Code Splitting**: Vite automatically splits vendor chunks (configured in `vite.config.ts`)

## Costs

Cloudflare Pages offers a generous free tier:
- Unlimited sites
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month

For most personal projects, the free tier is sufficient.
