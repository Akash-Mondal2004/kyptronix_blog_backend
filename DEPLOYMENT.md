# Deployment Guide for Render

## Pre-Deployment Checklist

✅ Environment variables configured  
✅ Dependencies properly listed in package.json  
✅ .env file excluded from git  
✅ MongoDB connection using environment variables  
✅ CORS configured for production  
✅ JWT secret using environment variables  

## Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create Render Web Service
1. Go to https://render.com
2. Click "New +" → "Web Service"  
3. Connect your GitHub repository
4. Configure:
   - **Name**: `kyptronix-blog-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Environment Variables (CRITICAL)
Add these in Render dashboard:

```
MONGODB_URI=mongodb+srv://aakashmondal43:akash21082004@cluster0.dqiejnd.mongodb.net/Kyptronix?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
JWT_SECRET=kyptronix_super_secure_jwt_secret_2025_change_this_in_production
CLIENT_URL=https://your-frontend-url.com
```

### 4. Deploy
Click "Create Web Service" and wait for deployment to complete.

### 5. Update Frontend
Update your frontend's `.env` file:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Important Notes

🚨 **Security**: Change JWT_SECRET to a secure random string  
🚨 **Database**: Ensure MongoDB allows connections from Render IPs  
🚨 **CORS**: Update CLIENT_URL with your actual frontend domain  

## Test Deployment

After deployment, test these endpoints:
- `GET https://your-backend-url.onrender.com/health`
- `POST https://your-backend-url.onrender.com/api/user/login`
- `GET https://your-backend-url.onrender.com/api/blogs`

## Troubleshooting

**Common Issues:**
1. **Database connection failed** → Check MONGODB_URI
2. **CORS errors** → Verify CLIENT_URL matches frontend domain
3. **JWT errors** → Ensure JWT_SECRET is set
4. **File upload issues** → Render has ephemeral file system, use cloud storage for production
