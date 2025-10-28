# Quick Reference Guide

## Common Commands

### Backend Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server (with auto-restart)
npm run dev

# Start production server
npm start

# Check if MongoDB is running (Windows)
mongosh

# Start MongoDB (Windows)
net start MongoDB

# Stop MongoDB (Windows)
net stop MongoDB
```

### Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Full Project Setup (From Scratch)

```bash
# Clone repository
git clone <repo-url>
cd primetrade-assignment

# Setup backend
cd backend
npm install
# Create .env file (see SETUP.md)
npm run dev

# In new terminal - Setup frontend
cd frontend
npm install
# Create .env.local file (see SETUP.md)
npm run dev
```

## Environment Files

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/password` - Change password

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats/summary` - Get statistics

### Query Parameters (Tasks)
- `?search=keyword` - Search tasks
- `?status=pending|in-progress|completed` - Filter by status
- `?priority=low|medium|high` - Filter by priority
- `?sortBy=createdAt&order=desc` - Sort results

## Default URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017
- **API Base**: http://localhost:5000/api

## Troubleshooting Quick Fixes

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### MongoDB Not Running

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Clear and Reinstall Dependencies

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Frontend Can't Connect to Backend

1. Check backend is running on port 5000
2. Verify `.env.local` has correct API URL
3. Check CORS settings in `backend/server.js`
4. Restart both servers

## Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main
```

## Testing Checklist

### Manual Testing
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access dashboard
- [ ] Create task
- [ ] Edit task
- [ ] Delete task
- [ ] Search tasks
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Update profile
- [ ] Change password
- [ ] Logout

### API Testing (Postman)
- [ ] Import collection
- [ ] Test register endpoint
- [ ] Test login (token saves)
- [ ] Test get profile
- [ ] Test update profile
- [ ] Test create task
- [ ] Test get tasks
- [ ] Test update task
- [ ] Test delete task

## File Structure Quick Reference

```
primetrade-assignment/
├── backend/
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation
│   └── server.js         # Main server file
├── frontend/
│   ├── components/       # React components
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS files
│   └── utils/            # Helper functions
├── README.md
├── SETUP.md
├── DEPLOYMENT.md
├── SCALABILITY.md
└── SUBMISSION.md
```

## Important Files

### Must Configure
- `backend/.env` - Backend environment variables
- `frontend/.env.local` - Frontend environment variables

### Must Review
- `README.md` - Full documentation
- `SETUP.md` - Setup instructions
- `SUBMISSION.md` - Assignment completion summary

### API Testing
- `PrimeTrade_API.postman_collection.json` - Import to Postman

## NPM Scripts Reference

### Backend package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Frontend package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## MongoDB Commands

```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use primetrade database
use primetrade

# Show collections
show collections

# Find all users
db.users.find()

# Find all tasks
db.tasks.find()

# Count documents
db.users.countDocuments()
db.tasks.countDocuments()

# Delete all tasks (for testing)
db.tasks.deleteMany({})

# Exit mongosh
exit
```

## Browser Testing

### Test on Multiple Devices
- Desktop: Full screen
- Tablet: 768px width
- Mobile: 375px width

### Browser DevTools
- Press F12 to open DevTools
- Click "Toggle device toolbar" (Ctrl+Shift+M)
- Select different devices
- Test responsive design

## Production Deployment Quick Commands

### Vercel (Frontend)
```bash
npm i -g vercel
cd frontend
vercel
```

### Render (Backend)
1. Push to GitHub
2. Connect repository on render.com
3. Add environment variables
4. Deploy

## Database URLs

### Local MongoDB
```
mongodb://localhost:27017/primetrade
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster.mongodb.net/primetrade
```

## Postman Quick Start

1. Import collection file
2. Set variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: (auto-filled on login)
3. Run "Register User"
4. Run "Login User" (saves token)
5. Run any protected endpoint

## Key Features to Demo

1. **Authentication**: Register → Login → Protected route
2. **CRUD**: Create → Read → Update → Delete tasks
3. **Search**: Type in search box → See filtered results
4. **Filter**: Select status/priority → See filtered results
5. **Profile**: Update name/bio → Change password
6. **Responsive**: Resize browser → See mobile layout

## Performance Tips

### Frontend
- Use Chrome DevTools Lighthouse
- Check Network tab for slow requests
- Monitor bundle size

### Backend
- Check MongoDB slow queries
- Monitor memory usage
- Check response times in Network tab

## Security Checklist

- [x] Passwords hashed with bcrypt
- [x] JWT tokens with expiration
- [x] Protected routes middleware
- [x] Input validation (client + server)
- [x] CORS configured
- [x] Environment variables for secrets
- [x] Error messages don't expose system info

## Documentation Files

- **README.md**: Complete project documentation
- **SETUP.md**: Step-by-step setup guide
- **DEPLOYMENT.md**: Deployment instructions
- **SCALABILITY.md**: Production scaling notes
- **SUBMISSION.md**: Assignment completion summary
- **QUICK_REFERENCE.md**: This file

---

**Pro Tip**: Keep this file open while developing for quick command reference!
