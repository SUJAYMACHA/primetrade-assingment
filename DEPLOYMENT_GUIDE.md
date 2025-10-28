# 🚀 Deployment Guide

This guide walks you through deploying the PrimeTrade Task Management application to production.

## ✅ Prerequisites Completed
- ✅ Code pushed to GitHub: https://github.com/SUJAYMACHA/primetrade-assingment
- ✅ CORS configured for production
- ✅ MongoDB Atlas database ready

---

## 📋 Deployment Checklist

### Step 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and sign in (use GitHub)

2. **Create New Web Service**:
   - Click **"New +"** → **"Web Service"**
   - Connect GitHub repository: `SUJAYMACHA/primetrade-assingment`
   - Allow Render access to the repository

3. **Configure Service**:
   ```
   Name: primetrade-backend
   Region: Frankfurt (EU Central) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**:
   
   Click **"Advanced"** → **"Add Environment Variable"** and add these:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://YOUR_DB_USER:YOUR_PASSWORD@cluster0.vcdqgxk.mongodb.net/primetrade` |
   | `JWT_SECRET` | `primetrade_super_secret_jwt_key_2024_production` |
   | `JWT_EXPIRE` | `30d` |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |

5. **Deploy**:
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for initial deployment
   - Once deployed, you'll see: ✅ "Your service is live"

6. **Copy Backend URL**:
   - It will look like: `https://primetrade-backend-xxxx.onrender.com`
   - **Save this URL** - you'll need it for frontend deployment

---

### Step 2: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign in with GitHub

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Find and select: `SUJAYMACHA/primetrade-assingment`
   - Click **"Import"**

3. **Configure Project**:
   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
     ```
     Key: NEXT_PUBLIC_API_URL
     Value: https://your-render-backend-url.onrender.com/api
     ```
   - ⚠️ **IMPORTANT**: Replace with your actual Render backend URL from Step 1
   - Make sure to add `/api` at the end!

5. **Deploy**:
   - Click **"Deploy"**
   - Wait 3-5 minutes
   - You'll see: "Congratulations! Your project has been deployed."

6. **Copy Frontend URL**:
   - It will look like: `https://primetrade-assingment.vercel.app`
   - Click **"Visit"** to test your live application

---

### Step 3: Verify Deployment

1. **Test Backend**:
   ```bash
   # Health check
   curl https://your-backend-url.onrender.com/api/health
   
   # Should return: {"status":"ok","message":"Server is running"}
   ```

2. **Test Frontend**:
   - Visit: `https://primetrade-assingment.vercel.app`
   - Register a new account
   - Create a task
   - Toggle dark mode
   - Test all features

3. **Check CORS**:
   - Open browser DevTools (F12) → Console
   - Should see NO CORS errors
   - API calls should work successfully

---

### Step 4: Update SUBMISSION.md

After successful deployment, update the `SUBMISSION.md` file with live URLs:

```markdown
## 🌐 Deployed Application

- **Frontend**: https://primetrade-assingment.vercel.app
- **Backend**: https://your-backend-url.onrender.com
- **GitHub**: https://github.com/SUJAYMACHA/primetrade-assingment
```

Commit and push:
```bash
git add SUBMISSION.md
git commit -m "Update deployment URLs"
git push
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Build fails on Render
- **Solution**: Check that all dependencies are in `package.json`
- Verify MongoDB URI is correct in environment variables

**Problem**: 502 Bad Gateway
- **Solution**: Check Render logs (click on service → "Logs" tab)
- Verify MongoDB connection string
- Ensure all env variables are set

**Problem**: API not responding
- **Solution**: Check if service is sleeping (Free tier sleeps after inactivity)
- First request may take 30-60 seconds to wake up

### Frontend Issues

**Problem**: Build fails on Vercel
- **Solution**: Check build logs for errors
- Verify `frontend/package.json` has all dependencies
- Ensure Next.js config is correct

**Problem**: "API Error" or connection refused
- **Solution**: Check `NEXT_PUBLIC_API_URL` environment variable
- Must include `/api` at the end
- Must use `https://` protocol
- Redeploy after fixing env var

**Problem**: CORS errors in browser console
- **Solution**: Verify Vercel URL is added to backend CORS config
- Push CORS changes and wait for Render to redeploy
- Clear browser cache and try again

### Database Issues

**Problem**: MongoDB connection timeout
- **Solution**: 
  - Check MongoDB Atlas → Network Access
  - Add `0.0.0.0/0` to IP whitelist (allow all)
  - Verify database user credentials

---

## 📊 Post-Deployment

### Performance Optimization

**Render Free Tier Considerations**:
- Service sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Consider using UptimeRobot to ping every 14 minutes to keep alive

**Vercel Free Tier**:
- Instant cold starts
- Excellent global CDN
- No sleep issues

### Monitoring

**Render Dashboard**:
- View logs in real-time
- Monitor memory/CPU usage
- Check deployment status

**Vercel Dashboard**:
- View deployment history
- Monitor performance analytics
- Check build logs

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel  
3. ✅ Verify both deployments
4. ✅ Update SUBMISSION.md with live URLs
5. ✅ Test all features on production
6. ✅ Send submission email to PrimeTrade team

---

## 📧 Submission Email Template

**To**: saami@bajarangs.com, nagasai@bajarangs.com, chetan@bajarangs.com  
**CC**: sonika@primetrade.ai  
**Subject**: Frontend Developer Task - Frontend Developer Intern

**Body**:
```
Dear PrimeTrade Team,

I am pleased to submit my completed assignment for the Frontend Developer Intern position.

🌐 Live Application: https://primetrade-assingment.vercel.app
📦 GitHub Repository: https://github.com/SUJAYMACHA/primetrade-assingment
🔗 API Backend: https://your-backend-url.onrender.com

Key Features Implemented:
✅ Full-stack task management application
✅ User authentication with JWT (sessions expire on tab close)
✅ CRUD operations for tasks
✅ Dark mode with persistent theme preference
✅ Responsive design for all devices
✅ Password visibility toggle
✅ Auto-logout on password change
✅ Real-time search and filtering
✅ Status and priority badges

Tech Stack:
- Frontend: Next.js 14, React 18, TailwindCSS
- Backend: Node.js, Express, MongoDB Atlas
- Deployment: Vercel (frontend), Render (backend)

Test Credentials:
You can register a new account or use the demo features.

Please feel free to reach out if you need any clarification or have questions.

Thank you for the opportunity!

Best regards,
Sujay Macha
```

---

## 🎉 Congratulations!

Your application is now live and ready for submission!

- Frontend: Fast, responsive, and beautiful UI with dark mode
- Backend: Secure API with JWT authentication
- Database: MongoDB Atlas for reliable data storage
- Deployment: Professional hosting on industry-standard platforms

Good luck with your submission! 🚀
