# Kyptronix Blog Backend

A Node.js backend API for the Kyptronix blog application with MongoDB, authentication, and file upload capabilities.

## Features

- 🔐 JWT Authentication
- 📝 Blog CRUD operations  
- 📁 File upload with Multer
- �️ MongoDB integration
- 📧 Email functionality with Nodemailer
- � Environment configuration ready

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (use a secure random string in production)
JWT_SECRET=your_super_secret_jwt_key_here

# CORS Origin (Frontend URL)
CLIENT_URL=https://your-frontend-domain.com
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables
4. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

### Health Check
- `GET /health` - Server health check

## Deployment on Render

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure `.env` is in `.gitignore`
3. Ensure all dependencies are in `package.json`

### Step 2: Create Render Web Service
1. Go to [Render.com](https://render.com)
2. Connect your GitHub account
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure the service:
   - **Name**: `kyptronix-blog-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/Kyptronix?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here_change_this
CLIENT_URL=https://your-frontend-domain.com
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy your application
3. Your backend will be available at: `https://your-service-name.onrender.com`

## Important Security Notes

1. **Change JWT_SECRET**: Use a secure, random string for JWT_SECRET in production
2. **Database Security**: Ensure your MongoDB cluster has proper authentication
3. **CORS Configuration**: Update CLIENT_URL to your frontend domain
4. **Environment Variables**: Never commit `.env` files to version control

## License

MIT License
