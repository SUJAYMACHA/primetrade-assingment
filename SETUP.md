# Quick Setup Guide

This guide will help you get the PrimeTrade application running on your local machine in under 10 minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** (comes with Node.js)

## Step-by-Step Setup

### 1. Clone or Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd primetrade-assignment

# Or download ZIP and extract
```

### 2. Install MongoDB

#### Windows
```powershell
# Download MongoDB Community Server from mongodb.com
# Run the installer
# Start MongoDB service
net start MongoDB
```

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Using MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Whitelist your IP address
6. Use the connection string in `.env` file

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows (PowerShell):
Copy-Item .env.example .env

# On macOS/Linux:
cp .env.example .env
```

**Edit the `.env` file** with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
# Or if using MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456789
JWT_EXPIRE=7d
NODE_ENV=development
```

**Start the backend server:**

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 Environment: development
```

Keep this terminal open and running.

### 4. Setup Frontend

Open a **new terminal window/tab** and navigate to the frontend directory:

```bash
# From project root
cd frontend

# Install dependencies
npm install

# Create .env.local file
# On Windows (PowerShell):
Copy-Item .env.example .env.local

# On macOS/Linux:
cp .env.example .env.local
```

The `.env.local` should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start the frontend development server:**

```bash
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 5. Access the Application

1. Open your browser
2. Navigate to: **http://localhost:3000**
3. You'll be redirected to the login page
4. Click "Sign up" to create an account
5. Fill in your details and register
6. You'll be automatically logged in and redirected to the dashboard!

## Testing the Application

### Create Your First Task

1. On the dashboard, click "New Task"
2. Fill in the task details:
   - **Title**: "Complete PrimeTrade Assignment"
   - **Description**: "Build and submit the full-stack application"
   - **Status**: In Progress
   - **Priority**: High
   - **Due Date**: Tomorrow
   - **Tags**: work, urgent
3. Click "Create Task"

### Test Search and Filters

1. Create a few more tasks with different statuses and priorities
2. Use the search bar to search for tasks
3. Use the dropdown filters to filter by status or priority
4. See the statistics update in real-time!

### Test Profile Management

1. Click "Profile" in the navigation
2. Click "Edit Profile"
3. Update your name, phone, or bio
4. Click "Save Changes"
5. Try changing your password

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error`

**Solution:**
- Ensure MongoDB is running: `mongosh` (should connect)
- Check if MongoDB service is started
- Verify MONGODB_URI in `.env` is correct
- If using Atlas, check IP whitelist and credentials

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the PORT in `.env` to a different number (e.g., 5001)

### Dependencies Installation Failed

**Error:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Frontend Can't Connect to Backend

**Error:** Network error or CORS issues

**Solution:**
- Ensure backend is running on port 5000
- Check `.env.local` has correct API URL
- Restart both frontend and backend
- Clear browser cache

## Testing the API with Postman

1. Import the Postman collection:
   - Open Postman
   - Click "Import"
   - Select `PrimeTrade_API.postman_collection.json`

2. Test the endpoints:
   - Start with "Register User"
   - Then "Login User" (token will be auto-saved)
   - Try all other endpoints

## Production Build

### Build Frontend for Production

```bash
cd frontend
npm run build
npm start
```

### Run Backend in Production

```bash
cd backend
npm start
```

## Next Steps

✅ **Application is running!** Now you can:

1. Explore all features
2. Test CRUD operations
3. Try search and filters
4. Update your profile
5. Check the responsive design on mobile

## Common Development Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start normally
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Need Help?

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Backend, Frontend) are running
4. Check the troubleshooting section above
5. Review the logs in the terminal

## Environment Verification

Run this checklist to ensure everything is set up correctly:

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB running (`mongosh` connects)
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Backend `.env` file created and configured
- [ ] Frontend `.env.local` file created
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Dashboard loads correctly

If all checkboxes are checked, you're ready to go! 🚀

---

**Congratulations! You now have a fully functional full-stack task management application running locally!**
