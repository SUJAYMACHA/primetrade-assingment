# Task Management Application

A full-stack task manager built with Next.js and Node.js. Simple, clean, and gets the job done.

## What's Inside

This is a practical task management app with user authentication and a dashboard to manage your tasks. Built as part of a learning project to demonstrate modern web development.

### Key Features

**User Management**
- Register and login with secure authentication
- Password protection using industry-standard bcrypt
- JWT tokens for session management
- User profile management

**Task Management**
- Create, edit, and delete tasks
- Mark tasks as pending, in progress, or completed
- Set priorities (low, medium, high)
- Add due dates to stay organized
- Search through your tasks
- Filter by status and priority
- Tag tasks for better organization

**Modern UI**
- Clean, responsive design that works on all devices
- Real-time feedback with toast notifications
- Smooth animations and transitions
- Form validation to catch errors early

## Built With

**Frontend**
- Next.js 14 & React 18
- TailwindCSS for styling
- Axios for API calls
- React Toastify for notifications

**Backend**
- Node.js & Express
- MongoDB for data storage
- JWT authentication
- bcrypt for password hashing

## Project Structure

```
primetrade-assignment/
├── backend/
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   └── Task.js           # Task schema with relationships
│   ├── routes/
│   │   ├── auth.js           # Authentication routes (register/login)
│   │   ├── user.js           # User profile routes
│   │   └── tasks.js          # Task CRUD routes
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── validate.js       # Request validation middleware
│   ├── server.js             # Express app setup
│   ├── package.json
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── components/
│   │   ├── Button.js         # Reusable button component
│   │   ├── Input.js          # Form input component
│   │   ├── Card.js           # Card component
│   │   ├── Layout.js         # Dashboard layout with nav
│   │   ├── Loading.js        # Loading spinner
│   │   ├── ProtectedRoute.js # Route protection HOC
│   │   └── TaskModal.js      # Task create/edit modal
│   ├── pages/
│   │   ├── _app.js           # Next.js app wrapper
│   │   ├── _document.js      # HTML document
│   │   ├── index.js          # Landing/redirect page
│   │   ├── login.js          # Login page
│   │   ├── register.js       # Registration page
│   │   ├── dashboard.js      # Main dashboard
│   │   └── profile.js        # User profile page
│   ├── styles/
│   │   └── globals.css       # Global styles + Tailwind
│   ├── utils/
│   │   ├── api.js            # API client & interceptors
│   │   └── auth.js           # Auth helper functions
│   ├── package.json
│   └── .env.local            # Frontend environment variables
│
├── postman/
│   └── PrimeTrade_API.postman_collection.json
├── docs/
│   ├── API.md                # Detailed API documentation
│   └── SCALABILITY.md        # Scalability notes
└── README.md                 # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd primetrade-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Start MongoDB (if running locally):
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

Start backend server:
```bash
npm run dev    # Development with nodemon
# OR
npm start      # Production
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Access the Application

1. Open browser and go to `http://localhost:3000`
2. Register a new account
3. Login and start managing tasks!

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-10-28T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "bio": "Software Developer"
}
```

#### Change Password
```http
PUT /user/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Task Endpoints

#### Get All Tasks (with filters)
```http
GET /tasks?search=meeting&status=pending&priority=high
Authorization: Bearer <token>
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete Assignment",
  "description": "Finish the PrimeTrade assignment",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2025-10-30",
  "tags": ["work", "urgent"]
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /tasks/stats/summary
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 10,
      "pending": 3,
      "in-progress": 4,
      "completed": 3
    }
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 🔒 Security Features

### Backend Security
1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Authentication**: Secure token-based authentication with expiration
3. **Protected Routes**: Middleware validates JWT tokens on protected endpoints
4. **Input Validation**: Server-side validation using express-validator
5. **CORS Configuration**: Controlled cross-origin resource sharing
6. **Environment Variables**: Sensitive data stored in .env files
7. **Error Handling**: Secure error messages without exposing system details

### Frontend Security
1. **Client-side Validation**: Forms validated before submission
2. **Secure Token Storage**: JWT stored in httpOnly cookies
3. **Automatic Token Management**: Interceptors handle token attachment
4. **Protected Routes**: React HOC prevents unauthorized access
5. **Auto Logout**: Expired tokens trigger automatic logout
6. **XSS Prevention**: React's built-in protection against XSS

## 📈 Scalability Notes

### Current Architecture Benefits
- **Modular Design**: Separation of concerns (routes, models, middleware)
- **RESTful API**: Standard API design for easy integration
- **Database Indexing**: MongoDB indexes for faster queries
- **Stateless Auth**: JWT enables horizontal scaling

### Production Scalability Recommendations

#### Backend Scaling
1. **Load Balancing**: Deploy multiple instances behind Nginx/ALB
2. **Database**: 
   - Use MongoDB Atlas with replica sets
   - Implement database connection pooling
   - Add Redis for session/cache management
3. **Rate Limiting**: Implement API rate limiting (express-rate-limit)
4. **Logging**: Add structured logging (Winston, Pino)
5. **Monitoring**: Implement APM (New Relic, Datadog)
6. **Caching**: Redis cache for frequently accessed data
7. **Queue System**: Bull/RabbitMQ for background jobs

#### Frontend Scaling
1. **CDN**: Deploy static assets to CDN (Cloudflare, AWS CloudFront)
2. **Code Splitting**: Implement dynamic imports for route-based splitting
3. **Image Optimization**: Use Next.js Image component
4. **SSR/SSG**: Leverage Next.js static generation where possible
5. **Bundle Optimization**: Analyze and reduce bundle size
6. **Service Workers**: Implement PWA features for offline support

#### DevOps
1. **Containerization**: Docker for consistent deployments
2. **Orchestration**: Kubernetes for container management
3. **CI/CD**: GitHub Actions / Jenkins for automated deployments
4. **Environment Management**: Separate dev/staging/prod environments
5. **Backup Strategy**: Automated database backups
6. **Security**: Regular dependency updates, vulnerability scanning

#### Microservices Migration (Future)
- Split into Auth, User, and Task services
- API Gateway (Kong, AWS API Gateway)
- Event-driven architecture with message queues
- Separate databases per service

### Cost-Effective Deployment Options

**Free/Low Cost:**
- Backend: Render, Railway, Fly.io
- Frontend: Vercel, Netlify
- Database: MongoDB Atlas (Free tier)

**Production:**
- AWS: EC2, ECS, Lambda
- Google Cloud: Cloud Run, App Engine
- Azure: App Service, Container Instances

## 🎨 Screenshots

### Login Page
- Clean, modern design
- Client-side validation
- Responsive layout

### Registration
- Multi-field validation
- Password confirmation
- Error handling

### Dashboard
- Task statistics cards
- Search and filter
- Real-time updates
- Responsive grid layout

### Task Management
- Create/Edit modal
- Inline editing
- Status badges
- Priority indicators

### Profile Page
- View/Edit profile
- Change password
- Secure validation

## 📦 Postman Collection

Import the Postman collection from `postman/PrimeTrade_API.postman_collection.json` to test all API endpoints.

**How to use:**
1. Open Postman
2. Import the collection file
3. Register a user
4. Login and copy the token
5. Set the token in Collection Variables
6. Test all endpoints!

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with validation
- [ ] User login
- [ ] Protected route access
- [ ] Task creation
- [ ] Task editing
- [ ] Task deletion
- [ ] Search functionality
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Profile update
- [ ] Password change
- [ ] Logout
- [ ] Responsive design on mobile
- [ ] Error handling

## Getting Started

### Prerequisites

You'll need these installed:
- Node.js (v14 or higher)
- MongoDB (local) or MongoDB Atlas account
- npm or yarn

### Installation

**1. Clone and Install Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

**2. Install and Run Frontend**

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

That's it! Open your browser to `http://localhost:3000` and you're ready to go.

## API Overview

The backend exposes RESTful endpoints for authentication, user management, and tasks.

**Auth Routes** (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - Sign in
- `GET /verify` - Check if token is valid

**User Routes** (`/api/user`) - Requires authentication
- `GET /profile` - Get user info
- `PUT /profile` - Update user info
- `PUT /password` - Change password

**Task Routes** (`/api/tasks`) - Requires authentication
- `GET /` - Get all tasks (with optional filters)
- `POST /` - Create new task
- `GET /:id` - Get specific task
- `PUT /:id` - Update task
- `DELETE /:id` - Delete task
- `GET /stats` - Get task statistics

All authenticated endpoints need a Bearer token in the Authorization header.

## Development Notes

### Security
- Passwords are hashed with bcrypt before storage
- JWT tokens for stateless authentication
- Input validation on both client and server
- Protected API routes with middleware
- Environment variables for sensitive data

### Database Schema
- Users: name, email, password (hashed), profile info
- Tasks: title, description, status, priority, due date, tags, user reference

### What I Learned

Working on this project taught me a lot about:
- Building secure authentication systems from scratch
- Designing RESTful APIs that make sense
- Managing state in React applications
- Making responsive UIs that actually work on mobile
- Connecting frontend and backend smoothly
- Handling errors gracefully
- Writing clean, maintainable code

## Testing

Use the included Postman collection (`PrimeTrade_API.postman_collection.json`) to test the API endpoints. Import it into Postman and start testing!
