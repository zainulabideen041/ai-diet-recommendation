# Environment Variables Setup Guide

This guide provides detailed instructions for setting up all required environment variables for the AI Dietary Recommendation App.

## 📁 File Locations

- **Backend**: `BACKEND/.env`
- **Frontend**: `FRONTEND/.env`

## 🔧 Backend Environment Variables (`BACKEND/.env`)

### Complete Template

```env
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/diatry

# Server Configuration
PORT=7004
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# Google Gemini AI API
GEMINIAPI=your_gemini_api_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

### Variable Details

#### `MONGODB_URI`
**Purpose**: Database connection string

**Local MongoDB**:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/diatry
```

**MongoDB Atlas** (Cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

**Setup Steps**:
1. **Local**: Install MongoDB and start the service
2. **Atlas**: 
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Whitelist your IP address
   - Create database user
   - Get connection string from "Connect" button

---

#### `PORT`
**Purpose**: Port number for backend server

**Default**: `7004`

**Note**: If you change this, update the frontend's `VITE_API_URL` accordingly

---

#### `NODE_ENV`
**Purpose**: Environment mode

**Values**: 
- `development` - for local development
- `production` - for production deployment

---

#### `JWT_SECRET`
**Purpose**: Secret key for signing JWT tokens

**Requirements**:
- Must be a long, random string
- Keep it secret and never commit to version control
- Minimum 32 characters recommended

**Generate a secure secret**:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

---

#### `GOOGLE_CLIENT_ID`
**Purpose**: Google OAuth authentication

**Setup Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen:
   - Application name: "AI Dietary Recommendation"
   - Authorized domains: your domain
6. Create OAuth Client ID:
   - Application type: Web application
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - Your production frontend URL
   - Authorized redirect URIs:
     - `http://localhost:7004/auth/google/callback` (development)
     - Your production backend URL + `/auth/google/callback`
7. Copy the **Client ID**

**Format**: `xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`

---

#### `GEMINIAPI`
**Purpose**: Google Gemini AI API for food recommendations

**Setup Steps**:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select or create a project
5. Copy the generated API key

**Format**: `AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX`

**Note**: Keep this key secure. It provides access to Gemini AI services.

---

#### `EMAIL_USER`
**Purpose**: Email address for sending notifications

**Recommended**: Use Gmail with App Passwords

**Setup Steps**:
1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate App Password (see `EMAIL_PASS` below)

**Format**: `your.email@gmail.com`

---

#### `EMAIL_PASS`
**Purpose**: App-specific password for email service

**Setup Steps for Gmail**:
1. Go to your Google Account
2. Select **Security**
3. Under "Signing in to Google," select **2-Step Verification**
4. At the bottom, select **App passwords**
5. Select app: **Mail**
6. Select device: **Other** (enter "AI Diet App")
7. Click **Generate**
8. Copy the 16-character password

**Format**: `abcd efgh ijkl mnop` (16 characters, may have spaces)

**Important**: 
- This is NOT your regular Gmail password
- You must have 2FA enabled to generate app passwords
- Keep this secure

---

## 🎨 Frontend Environment Variables (`FRONTEND/.env`)

### Complete Template

```env
# Google OAuth Client ID (must match backend)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# Backend API URL
VITE_API_URL=http://localhost:7004
```

### Variable Details

#### `VITE_GOOGLE_CLIENT_ID`
**Purpose**: Google OAuth authentication (client-side)

**Value**: Same as backend's `GOOGLE_CLIENT_ID`

**Note**: Must be prefixed with `VITE_` for Vite to expose it to the browser

---

#### `VITE_API_URL`
**Purpose**: Backend API base URL

**Development**: `http://localhost:7004`

**Production**: Your deployed backend URL (e.g., `https://your-backend.vercel.app`)

**Note**: No trailing slash

---

## 🚀 Production Deployment

### Backend (Vercel/Heroku/etc.)

Set environment variables in your hosting platform:

**Vercel**:
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GEMINIAPI
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add NODE_ENV production
vercel env add PORT 7004
```

**Important**: Update CORS origin in `server.js`:
```javascript
origin: "https://your-frontend-domain.vercel.app"
```

### Frontend (Vercel/Netlify/etc.)

**Vercel**:
```bash
vercel env add VITE_GOOGLE_CLIENT_ID
vercel env add VITE_API_URL
```

**Netlify**: Add in Site Settings → Environment Variables

---

## ✅ Verification Checklist

### Backend
- [ ] MongoDB connection successful
- [ ] Server starts without errors
- [ ] JWT tokens are generated correctly
- [ ] Google OAuth login works
- [ ] AI recommendations are generated
- [ ] Emails are sent successfully

### Frontend
- [ ] App loads without errors
- [ ] Google OAuth button appears
- [ ] API calls reach the backend
- [ ] Authentication flow works
- [ ] AI features are accessible

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different secrets** for development and production
3. **Rotate secrets regularly**, especially if exposed
4. **Use environment-specific values** (don't use production DB in development)
5. **Limit API key permissions** to only what's needed
6. **Enable IP whitelisting** for MongoDB Atlas
7. **Use HTTPS** in production
8. **Keep dependencies updated** for security patches

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB service is running
- Verify `MONGODB_URI` is correct
- For Atlas: Check IP whitelist and credentials

### "Google OAuth not working"
- Verify `GOOGLE_CLIENT_ID` matches in both frontend and backend
- Check authorized redirect URIs in Google Console
- Ensure frontend and backend URLs are correct

### "AI recommendations failing"
- Verify `GEMINIAPI` is valid and active
- Check API quota limits in Google AI Studio
- Ensure you have billing enabled (if required)

### "Emails not sending"
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct
- Ensure 2FA is enabled and app password is generated
- Check Gmail security settings

### "JWT errors"
- Ensure `JWT_SECRET` is set and consistent
- Check token expiration settings
- Verify cookies are being sent/received

---

## 📞 Support

If you encounter issues:
1. Check this guide thoroughly
2. Review error messages in console/logs
3. Verify all environment variables are set correctly
4. Open an issue on GitHub with detailed error information

---

**Last Updated**: December 2025
