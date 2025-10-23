# Mixer Frontend

A modern, production-ready React frontend for the Mixer dating app, built with React (JSX) and Tailwind CSS.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Component-Driven Design**: Modular, reusable components following best practices
- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **TypeScript-Ready**: JSX files ready for TypeScript migration
- **Production Standards**: Clean code, proper separation of concerns, and scalable architecture

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── dating/         # Dating-specific components
│   │   ├── ChatInput.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ProfileCard.jsx
│   │   └── SwipeCard.jsx
│   ├── layout/         # Layout components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   └── ui/             # Reusable UI components
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── LoadingSpinner.jsx
│       ├── Logo.jsx
│       └── Modal.jsx
├── contexts/           # React contexts
│   └── AuthContext.js
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Matches.jsx
│   ├── Profile.jsx
│   └── Register.jsx
├── services/           # API services
├── utils/              # Utility functions
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Secondary**: Purple tones (#d946ef to #701a75)
- **Accent**: Green tones (#22c55e to #14532d)
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: Form inputs with validation states
- **Card**: Flexible container with multiple padding/shadow options
- **Modal**: Accessible modal with backdrop and keyboard navigation

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm start
```

### Build for Production

```bash
npm run build
```

## 📱 Pages

### Authentication

- **Login**: Modern login form with validation
- **Register**: Comprehensive registration with interest selection

### Main App

- **Dashboard**: User overview with stats and quick actions
- **Profile**: User profile management with photo upload
- **Matches**: Browse and interact with matches

## 🎯 Key Features

### Authentication

- Form validation with real-time feedback
- Loading states and error handling
- Responsive design for all screen sizes

### User Interface

- Consistent design system
- Accessible components
- Smooth animations and transitions
- Mobile-optimized interactions

### Dating Features

- Profile cards with swipe functionality
- Match management
- Chat interface components
- Interest-based matching

## 🔧 Customization

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Extended color palette
- Custom animations
- Component classes
- Responsive breakpoints

### Component Styling

All components use Tailwind classes with:

- Consistent spacing
- Responsive design
- Dark/light mode support
- Accessibility features

## 📦 Dependencies

### Core

- React 18.2.0
- React Router DOM 6.8.1
- Axios 1.6.2

### Development

- Tailwind CSS 3.4.17
- PostCSS 8.5.6
- Autoprefixer 10.4.21

## 🚀 Deployment

The app is ready for deployment to:

- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

Build the project and deploy the `build` folder.

## 📝 Code Standards

- **File Size**: All files under 400 lines
- **Component Structure**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Organized and clean import statements
- **JSX**: Proper JSX syntax with meaningful component names

## 🔄 Future Enhancements

- TypeScript migration
- Unit testing with Jest/React Testing Library
- Storybook for component documentation
- PWA features
- Real-time messaging
- Advanced matching algorithms

## 📄 License

This project is part of the Mixer dating app ecosystem.
