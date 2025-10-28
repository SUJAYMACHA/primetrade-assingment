# Deployment Guide

This guide covers deploying the PrimeTrade application to production using various hosting platforms.

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended for Quick Deployment

#### Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Framework: Next.js
   - Root Directory: `frontend`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy"

3. **Deploy via CLI**:
```bash
cd frontend
vercel
# Follow prompts
```

Your frontend will be live at: `https://your-app.vercel.app`

#### Deploy Backend to Render

1. **Create account** at [render.com](https://render.com)

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Settings:
     - **Name**: primetrade-backend
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: Free

3. **Environment Variables**:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_secret_key_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=production
```

4. **Deploy**: Click "Create Web Service"

Backend will be live at: `https://primetrade-backend.onrender.com`

#### Setup MongoDB Atlas (Database)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**:
   - Choose "Create a cluster"
   - Select free tier (M0)
   - Choose region closest to your backend
   - Name: primetrade-cluster

3. **Security Setup**:
   - Create database user (username + password)
   - Network Access → Add IP: `0.0.0.0/0` (allow from anywhere)

4. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Use this in Render environment variables

### Option 2: All-in-One Platforms

#### Railway.app

**Deploy Entire Application:**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Add environment variables
5. Railway will auto-detect and deploy both services

**Estimated Cost**: $5-20/month

#### Heroku

**Backend Deployment:**

```bash
cd backend
heroku login
heroku create primetrade-backend
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret_key
git subtree push --prefix backend heroku main
```

**Frontend Deployment:**

```bash
cd frontend
heroku create primetrade-frontend
heroku config:set NEXT_PUBLIC_API_URL=https://primetrade-backend.herokuapp.com/api
git subtree push --prefix frontend heroku main
```

### Option 3: AWS (Production-Grade)

#### Frontend: AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli
amplify configure

# Initialize and deploy
cd frontend
amplify init
amplify add hosting
amplify publish
```

#### Backend: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

cd backend
eb init
eb create primetrade-backend-env
eb deploy
```

#### Database: AWS DocumentDB (MongoDB compatible)

- Create DocumentDB cluster in AWS Console
- Configure security groups
- Update MONGODB_URI in Elastic Beanstalk environment

### Option 4: Docker Deployment

#### Create Dockerfiles

**Backend Dockerfile** (`backend/Dockerfile`):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

**Docker Compose** (`docker-compose.yml`):
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_DATABASE: primetrade

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://mongodb:27017/primetrade
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRE: 7d
      NODE_ENV: production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:5000/api
    restart: unless-stopped

volumes:
  mongo-data:
```

**Deploy with Docker:**
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Deploy to DigitalOcean App Platform

```bash
# Install doctl CLI
# Connect to DigitalOcean
doctl apps create --spec .do/app.yaml
```

## Environment Variables Checklist

### Backend Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=minimum_32_character_random_string
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## Post-Deployment Checklist

- [ ] Frontend accessible via HTTPS
- [ ] Backend accessible via HTTPS
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads correctly
- [ ] Can create tasks
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] Search works correctly
- [ ] Filters work correctly
- [ ] Profile update works
- [ ] Password change works
- [ ] Logout works
- [ ] Responsive on mobile
- [ ] SSL certificate valid
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Database connection stable

## Custom Domain Setup

### Vercel (Frontend)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `app.yourdomain.com`)
3. Add DNS records as instructed:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Render (Backend)

1. Go to Service Settings → Custom Domain
2. Add domain (e.g., `api.yourdomain.com`)
3. Add DNS CNAME record:
   ```
   Type: CNAME
   Name: api
   Value: your-service.onrender.com
   ```

## SSL/HTTPS

All mentioned platforms provide free SSL certificates automatically:
- Vercel: Automatic Let's Encrypt
- Render: Automatic Let's Encrypt
- Railway: Automatic SSL
- AWS Amplify: Free SSL with ACM

## Monitoring & Logging

### Setup Application Monitoring

1. **Sentry** (Error Tracking):
```bash
npm install @sentry/node @sentry/nextjs
```

```javascript
// backend/server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });

// frontend/sentry.client.config.js
import * as Sentry from "@sentry/nextjs";
Sentry.init({ dsn: "your-sentry-dsn" });
```

2. **LogRocket** (Session Replay):
```bash
npm install logrocket
```

3. **Google Analytics** (Usage Tracking):
```javascript
// frontend/pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

## Performance Optimization

### Frontend Optimizations

1. **Enable Compression**:
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};
```

2. **Image Optimization**:
```javascript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  width={100}
  height={100}
  alt="Profile"
  priority
/>
```

### Backend Optimizations

1. **Enable Compression**:
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Setup Caching Headers**:
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  next();
});
```

## Backup Strategy

### Database Backups

**MongoDB Atlas** (Automatic):
- Go to Clusters → Backup
- Enable Cloud Backup
- Set backup schedule (recommended: Daily)
- Retention: 7-30 days

**Manual Backup**:
```bash
# Backup
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb+srv://..." /backup/20250128
```

## Rollback Procedure

### Quick Rollback

**Vercel**:
1. Go to Deployments
2. Find previous stable deployment
3. Click "Promote to Production"

**Render**:
1. Go to Deploy History
2. Select previous deploy
3. Click "Rollback to this version"

**Docker**:
```bash
# Tag and push working version
docker tag primetrade:latest primetrade:stable

# Rollback
docker-compose down
docker-compose up -d
```

## Scaling

### Horizontal Scaling

**Render**: Upgrade to paid plan, increase instance count

**AWS ECS**: Update task definition, increase desired count

**Kubernetes**:
```bash
kubectl scale deployment primetrade-backend --replicas=3
kubectl scale deployment primetrade-frontend --replicas=3
```

### Database Scaling

**MongoDB Atlas**:
1. Go to Clusters
2. Edit Configuration
3. Upgrade cluster tier (M10, M20, M30, etc.)
4. Enable auto-scaling if available

## Cost Estimates

### Free Tier (Testing)
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas M0 (Free)
- **Total**: $0/month

### Small Production (< 10k users)
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Render Standard ($25/month)
- **Database**: MongoDB Atlas M10 ($57/month)
- **Total**: $102/month

### Medium Production (< 100k users)
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Render Professional ($85/month) x2
- **Database**: MongoDB Atlas M30 ($310/month)
- **CDN**: Cloudflare Pro ($20/month)
- **Total**: $520/month

## Troubleshooting Deployment Issues

### Build Failures

**Next.js Build Error**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Node Version Mismatch**:
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Runtime Errors

**CORS Issues**:
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

**Database Connection**:
- Verify MongoDB URI is correct
- Check IP whitelist includes deployment server
- Ensure database user has correct permissions

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Congratulations! Your application is now deployed and accessible worldwide! 🚀**

Remember to:
- Monitor application logs regularly
- Set up alerts for critical errors
- Keep dependencies updated
- Review security advisories
- Backup database regularly
