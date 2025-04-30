# 🍿 MovieHub Frontend

<p align="center">
<span style="font-size: 80px;">🎬</span>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.x-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

A sleek, modern frontend for MovieHub - a real-time movie rating platform built with Next.js. Features a responsive design, real-time notifications, and an intuitive interface for browsing, rating, and reviewing movies.

## 📋 Features

- **Authentication System**
  - Secure login and registration
  - JWT-based auth with access & refresh tokens
  - Protected routes with middleware
  - Persistent sessions

- **Movie Experience**
  - Browse latest, popular, and genre-specific movies
  - Detailed movie pages with ratings and reviews
  - Hero banner with featured movies
  - Advanced search functionality

- **Rating & Reviews**
  - User-friendly review submission
  - Star-based rating system
  - Real-time updates of new reviews
  - Prevention of duplicate reviews per user

- **Real-time Features**
  - Socket.IO integration for instant updates
  - Live notifications for new reviews and activities
  - Notification badge showing unread count
  - Real-time review feed

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for all screen sizes
  - Optimized navigation for mobile devices
  - Swiper integration for touch-friendly carousels

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Authentication**: JWT
- **Real-time**: Socket.IO Client
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Image Optimization**: Next Image

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/moviehub-frontend.git
cd moviehub-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## 📱 Pages & Features

### Authentication

- **Login Page**: Secure user authentication with JWT
- **Registration Page**: New user registration with form validation
- **Persistent Sessions**: Automatic token refresh for seamless experience

### Movie Browsing

- **Home Page**: Featured movies, latest releases, and categorized sections
- **Search Page**: Advanced search with filters and real-time results
- **Movie Details**: Comprehensive information about each movie

### User Interaction

- **Reviews**: Write and read movie reviews
- **Ratings**: Rate movies on a 10-point scale
- **Notifications**: Real-time notification system for user activities

### Dashboard (For Authorized Users)

- **Profile Management**: Update user information
- **Favorites**: Save and manage favorite movies
- **Review History**: Track past reviews and ratings

## 🔄 Token Flow

The frontend implements a secure token management system:

1. **Initial Authentication**:
   - User logs in → receives access token (stored in memory) and refresh token (stored in HTTP-only cookie)
   - Access token added to Authorization header for API requests

2. **Token Refresh Mechanism**:
   - Client detects 401 Unauthorized responses
   - Automatically attempts to refresh the access token
   - Continues the original request with new token if successful

3. **Security Measures**:
   - Access tokens stored in memory to prevent XSS
   - Refresh tokens managed securely via cookies
   - Automatic logout on serious authentication failures

## 🔌 Socket.IO Integration

The application uses Socket.IO for real-time features:

| Feature | Description |
|---------|-------------|
| **Live Notifications** | Instant alerts for new reviews and activities |
| **Real-time Reviews** | See new reviews appear without refreshing |
| **User Presence** | Track active users and their activities |
| **Automatic Reconnection** | Seamless experience during connection disruptions |

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── movies/           # Movie listings and details
│   ├── notifications/    # Notification center
│   ├── search/           # Search functionality
├── components/           # Reusable React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── Movies/           # Movie-related components
│   ├── navbar/           # Navigation components
│   ├── reviews/          # Review components
│   ├── ui/               # UI components
├── provider/             # React Context providers
├── action/               # Server actions
├── hooks/                # Custom React hooks
├── interface/            # TypeScript interfaces
├── lib/                  # Utility libraries
├── services/             # API service functions
└── utils/                # Utility functions
```

## 🎨 UI/UX Features

- **Dark Theme**: Eye-friendly dark mode design
- **Smooth Animations**: Transitions and micro-interactions
- **Responsive Images**: Optimized loading with Next.js Image component
- **Loading States**: Skeletons and placeholders for better UX
- **Toast Notifications**: Non-intrusive feedback system
- **Intuitive Navigation**: Mobile-friendly navigation with hamburger menu

## 🔐 Security Features

- **Protected Routes**: Server-side and client-side route protection
- **Form Validation**: Input validation for all forms
- **Secure Token Management**: JWT stored securely
- **XSS Protection**: React's built-in protection and careful handling of user input
- **CSRF Protection**: Implemented via secure cookie handling

## 🚀 Deployment

This frontend is deployed at: [https://moviehub.example.com](https://moviehub.example.com)

## 📝 License

MIT

## 🔗 Backend Repository

The backend repository for this project can be found at:
[https://github.com/yourusername/moviehub-backend](https://github.com/yourusername/moviehub-backend)

---

Built with ❤️ for the MovieHub Technical Task
