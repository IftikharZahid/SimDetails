# SimDetails (GetCrack)

A professional React Native mobile application for fetching and displaying SIM card information from multiple data sources.

## 📱 Overview

SimDetails is a cross-platform mobile application built with React Native and Expo that allows users to query SIM card details from various servers. The app features a modern, professional design with a clean blue-teal color scheme and provides multiple data source options for comprehensive SIM information lookup.

## ✨ Features

- **Multiple Data Sources**: Access SIM information from multiple servers (Server01, Server02, Server03)
- **Real-time Data Fetching**: Query SIM details using phone numbers
- **Professional UI/UX**: Modern, compact design with responsive layouts
- **Theme Support**: Dark/Light theme support with custom theming context
- **Data Export**: Copy or share SIM information
- **Splash Screen**: Branded splash screen with smooth animations
- **Disclaimer Modal**: User agreement and terms acceptance
- **Privacy Policy**: Built-in privacy policy screen
- **Safe Area Support**: Optimized for all device types and screen sizes

## 🏗️ Project Structure

```
SimDetails/
├── assets/              # Application assets (icons, images)
├── components/          # Reusable React components
│   └── DisclaimerModal.js
├── context/             # React context providers
│   └── ThemeContext.js  # Theme management
├── screens/             # Application screens
│   ├── HomeScreen.js
│   ├── Server01.js
│   ├── Server02.js
│   ├── Server03.js
│   ├── SplashScreen.js
│   └── PrivacyPolicyScreen.js
├── App.js               # Main application component
├── index.js             # Application entry point
├── package.json         # Dependencies and scripts
└── app.json            # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SimDetails
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on specific platform**
   ```bash
   # For Android
   npm run android

   # For iOS
   npm run ios

   # For Web
   npm run web
   ```

## 📦 Dependencies

### Core Dependencies
- **React**: ^19.1.0
- **React Native**: ^0.81.5
- **Expo**: ~54.0.31

### Navigation
- **@react-navigation/native**: ^7.1.28
- **@react-navigation/native-stack**: ^7.10.0
- **react-native-screens**: ~4.16.0
- **react-native-safe-area-context**: ^5.6.2

### UI Components & Utilities
- **@expo/vector-icons**: ^15.0.3
- **expo-linear-gradient**: ~15.0.8
- **expo-clipboard**: ~8.0.8
- **expo-font**: ^14.0.10
- **react-native-view-shot**: 4.0.3

### Other
- **expo-status-bar**: ~3.0.9
- **expo-splash-screen**: ^31.0.13

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run web` | Run in web browser |

## 🎨 Design

The application features a modern, professional design with:
- **Color Scheme**: Blue and teal gradient themes
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Compact, responsive design optimized for mobile devices
- **Animations**: Smooth transitions and interactions
- **Accessibility**: Large touch targets and clear visual feedback

## 🔐 Privacy & Security

The application includes:
- Privacy Policy screen for user transparency
- Disclaimer modal for terms acceptance
- Secure API communication
- No local data storage of sensitive information

## 🌐 API Integration

The app integrates with multiple data sources:
- **Server01**: Primary SIM data endpoint
- **Server02**: Secondary data source with normalized field handling
- **Server03**: Alternative data provider

## 🛠️ Development

### Tech Stack
- **Framework**: React Native with Expo
- **Language**: JavaScript (with TypeScript support)
- **State Management**: React Context API
- **Navigation**: React Navigation (Native Stack)
- **UI**: React Native components with custom styling

### Code Structure
- Functional components with React Hooks
- Context-based theme management
- Screen-based navigation architecture
- Reusable component library

## 📱 Platform Support

- ✅ **Android**: Full support with edge-to-edge enabled
- ✅ **iOS**: Full support with tablet optimization
- ✅ **Web**: Basic web support available

## 📄 License

Private project - Not for public distribution

## 👨‍💻 Version

**Current Version**: 1.0.0

## 🔄 Recent Updates

- Professional UI redesign with blue-teal color scheme
- Improved API integration for all servers
- Enhanced error handling and data normalization
- Responsive layout optimizations
- Social media integration modal
- Video lectures screen integration

---

**Note**: This application is designed for information purposes only. Please ensure compliance with local regulations regarding SIM card information lookup and data privacy.
