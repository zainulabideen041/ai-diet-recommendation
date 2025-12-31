# 🥗 AI Dietary Recommendation App

An intelligent dietary recommendation system that analyzes food items and provides personalized recommendations based on user health data. Users can select foods, receive AI-powered health insights, and chat with an AI nutritionist.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.1.1-blue)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green)

## ✨ Features

- 🤖 **AI-Powered Recommendations**: Get personalized dietary advice based on your health profile
- 🍎 **Food Analysis**: Select food items and receive detailed analysis comparing benefits and potential harms
- 💬 **AI Chat**: Interactive chat with an AI nutritionist for real-time dietary guidance
- 👤 **User Profiles**: Comprehensive health data management including:
  - Age, gender, height, weight
  - Activity level tracking
  - Dietary preferences (vegetarian, vegan, halal, gluten-free, etc.)
  - Allergies and medical conditions
  - Fitness goals (weight loss, muscle gain, maintenance)
- 🔐 **Secure Authentication**: Email/password and Google OAuth login
- 📊 **Personalized Dashboard**: Track your dietary journey and health metrics
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Authentication**: Google OAuth (@react-oauth/google)

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Google Auth Library
- **AI Integration**: Google Generative AI (Gemini)
- **Email Service**: Nodemailer
- **File Upload**: Multer with Cloudinary
- **Real-time**: Socket.io
- **Security**: bcryptjs, cookie-parser, CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-diet-recommendation.git
cd ai-diet-recommendation
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd BACKEND
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `BACKEND` directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/diatry
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/diatry?retryWrites=true&w=majority

# Server Configuration
PORT=7004
NODE_ENV=development

# JWT Secret (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here

# Google Gemini AI API
GEMINIAPI=your_gemini_api_key_here

# Email Configuration (for Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Cloudinary Configuration (optional, for image uploads)
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string (local or Atlas) | ✅ Yes |
| `PORT` | Port number for the backend server | ✅ Yes |
| `NODE_ENV` | Environment mode (development/production) | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token generation | ✅ Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ Yes |
| `GEMINIAPI` | Google Gemini AI API key | ✅ Yes |
| `EMAIL_USER` | Email address for sending notifications | ✅ Yes |
| `EMAIL_PASS` | App-specific password for email | ✅ Yes |
| `CLOUDINARY_*` | Cloudinary credentials for image uploads | ⚠️ Optional |

#### Start the Backend Server

```bash
npm start
```

The backend server will start on `http://localhost:7004`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../FRONTEND
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `FRONTEND` directory with the following variables:

```env
# Google OAuth Client ID (must match backend)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Backend API URL
VITE_API_URL=http://localhost:7004
```

#### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID (same as backend) | ✅ Yes |
| `VITE_API_URL` | Backend API base URL | ✅ Yes |

#### Start the Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

## 🔑 Obtaining API Keys

### Google OAuth Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:7004/auth/google/callback` (development)
   - Your production backend URL + `/auth/google/callback`
7. Copy the **Client ID** and use it in both frontend and backend `.env` files

### Google Gemini AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the API key and add it to your backend `.env` file as `GEMINIAPI`

### Email Configuration (Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use your Gmail address as `EMAIL_USER` and the generated password as `EMAIL_PASS`

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/your/data/directory

# Use this connection string:
MONGODB_URI=mongodb://127.0.0.1:27017/diatry
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Get your connection string and replace in `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/diatry?retryWrites=true&w=majority
```

## 📁 Project Structure

```
ai-diet-recommendation/
├── BACKEND/
│   ├── controllers/          # Request handlers
│   │   ├── AiRecommend.js   # AI recommendation logic
│   │   ├── Authentication.js # Auth controllers
│   │   └── Users.js         # User management
│   ├── models/              # MongoDB schemas
│   │   ├── User.js          # User model
│   │   └── TempUser.js      # Temporary user model
│   ├── routes/              # API routes
│   │   ├── AiRecommend.js
│   │   ├── Authentication.js
│   │   └── User.js
│   ├── utils/               # Utility functions
│   ├── server.js            # Express server entry point
│   ├── package.json
│   └── .env                 # Backend environment variables
│
├── FRONTEND/
│   ├── src/
│   │   ├── Components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   │   ├── Home/
│   │   │   ├── Dashboard/
│   │   │   ├── Profile/
│   │   │   ├── AiRecommend/
│   │   │   ├── Aichat/
│   │   │   ├── Authentication/
│   │   │   ├── Contact/
│   │   │   └── menu/
│   │   ├── redux/           # Redux store and slices
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # React entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js       # Vite configuration
│   └── .env                 # Frontend environment variables
│
├── .gitignore
└── README.md
```

## 🎯 Usage

1. **Sign Up / Login**
   - Create an account using email/password or Google OAuth
   - Complete your health profile with personal information

2. **Update Health Profile**
   - Navigate to Profile page
   - Add your health data (age, weight, height, activity level)
   - Set dietary preferences and allergies
   - Define your fitness goals

3. **Get Food Recommendations**
   - Browse or search for food items
   - Select a food item to analyze
   - View AI-generated recommendations based on your health profile
   - See benefits and potential concerns specific to your health data

4. **Chat with AI Nutritionist**
   - Access the AI Chat feature
   - Ask questions about nutrition, diet plans, or specific foods
   - Get personalized advice based on your profile

5. **Track Your Progress**
   - View your dashboard for insights
   - Monitor your dietary journey
   - Adjust goals as needed

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ HTTP-only cookies for token storage
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Secure Google OAuth integration

## 🌐 Deployment

### Backend Deployment (Vercel)
The backend is configured for Vercel deployment with `vercel.json`. Update the CORS origin in `server.js` to match your production frontend URL.

### Frontend Deployment (Vercel)
```bash
cd FRONTEND
npm run build
# Deploy the dist folder to Vercel or your preferred hosting
```

Update environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Google Gemini AI for powering the recommendation engine
- MongoDB for database solutions
- React and Vite communities for excellent documentation
- All contributors who help improve this project

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

## 🐛 Known Issues

- None currently reported

## 🗺️ Roadmap

- [ ] Mobile app version (React Native)
- [ ] Meal planning feature
- [ ] Recipe recommendations
- [ ] Integration with fitness trackers
- [ ] Multi-language support
- [ ] Nutrition tracking and logging
- [ ] Social features (share meals, follow friends)

---

**Made with ❤️ for healthier living**
