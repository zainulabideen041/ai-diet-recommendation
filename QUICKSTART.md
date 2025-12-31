# 🚀 Quick Start Guide

Get the AI Dietary Recommendation App running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js (v18+) installed
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Google account (for OAuth and Gemini API)
- [ ] Gmail account (for email notifications)

## Step-by-Step Setup

### 1️⃣ Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-diet-recommendation.git
cd ai-diet-recommendation

# Install backend dependencies
cd BACKEND
npm install

# Install frontend dependencies
cd ../FRONTEND
npm install
```

### 2️⃣ Setup Environment Variables (3 minutes)

#### Backend Setup

```bash
# In BACKEND folder
cp .env.example .env
```

Edit `BACKEND/.env` and add:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/diatry
PORT=7004
NODE_ENV=development
JWT_SECRET=your_random_secret_here_make_it_long
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GEMINIAPI=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

#### Frontend Setup

```bash
# In FRONTEND folder
cp .env.example .env
```

Edit `FRONTEND/.env` and add:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
VITE_API_URL=http://localhost:7004
```

### 3️⃣ Get API Keys (Quick Links)

| Service | Get Key Here | Add to |
|---------|-------------|--------|
| Google OAuth | [Google Console](https://console.cloud.google.com/apis/credentials) | Both `.env` files |
| Gemini AI | [AI Studio](https://makersuite.google.com/app/apikey) | `BACKEND/.env` |
| Gmail App Password | [App Passwords](https://myaccount.google.com/apppasswords) | `BACKEND/.env` |

**Quick OAuth Setup:**
1. Create OAuth Client ID in Google Console
2. Add redirect URI: `http://localhost:7004/auth/google/callback`
3. Copy Client ID to both `.env` files

### 4️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
# Or on Windows: Start MongoDB service from Services
```

**Option B: MongoDB Atlas**
- Use connection string in `MONGODB_URI`

### 5️⃣ Run the Application

**Terminal 1 - Backend:**
```bash
cd BACKEND
npm start
```
✅ Backend running on `http://localhost:7004`

**Terminal 2 - Frontend:**
```bash
cd FRONTEND
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### 6️⃣ Test the App

1. Open browser: `http://localhost:5173`
2. Click "Sign Up" or "Login with Google"
3. Create an account or login
4. Complete your health profile
5. Try AI food recommendations!

## 🎯 Minimal Setup (Skip Email)

If you want to skip email setup temporarily:

1. Comment out email-related code in backend
2. Or use dummy values:
   ```env
   EMAIL_USER=dummy@gmail.com
   EMAIL_PASS=dummypassword
   ```

**Note:** Email features won't work, but the app will run.

## ⚡ One-Command Setup (Advanced)

Create a setup script:

**`setup.sh` (Mac/Linux):**
```bash
#!/bin/bash
cd BACKEND && npm install && cd ../FRONTEND && npm install
echo "✅ Dependencies installed!"
echo "⚠️  Don't forget to setup .env files!"
```

**`setup.ps1` (Windows PowerShell):**
```powershell
Set-Location BACKEND
npm install
Set-Location ../FRONTEND
npm install
Write-Host "✅ Dependencies installed!" -ForegroundColor Green
Write-Host "⚠️  Don't forget to setup .env files!" -ForegroundColor Yellow
```

Run: `./setup.sh` or `./setup.ps1`

## 🐛 Common Issues

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### "Port already in use"
```bash
# Change PORT in BACKEND/.env
PORT=8000
```

### "Google OAuth not working"
- Verify `GOOGLE_CLIENT_ID` is same in both `.env` files
- Check redirect URI: `http://localhost:7004/auth/google/callback`

### "Module not found"
```bash
# Reinstall dependencies
cd BACKEND && npm install
cd ../FRONTEND && npm install
```

## 📚 Next Steps

- ✅ Read the full [README.md](README.md) for detailed documentation
- ✅ Check [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) for detailed API key setup
- ✅ Review [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## 🎉 You're Ready!

Your AI Dietary Recommendation App should now be running!

**Default URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:7004

**Need help?** Open an issue on GitHub!

---

**Happy Coding! 🚀**
