# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (choose platform)
npm start              # Start Expo development server with platform selection
npm run android        # Start Android development
npm run ios            # Start iOS development  
npm run web            # Start web development
```

## Architecture Overview

This is a React Native Expo mobile application for UNIHealth, a medical platform with patient, medic, and admin roles. The app features authentication, medical appointments, health diaries, alerts, and location-based emergency services.

### Key Architecture Patterns

- **Authentication Flow**: Conditional navigation based on auth state and tutorial completion
- **Role-based Access**: User roles (patient/medic/admin) control feature access
- **Location Services**: GPS integration for medical emergency alerts
- **API Integration**: Centralized axios instance with Bearer token authentication

### Project Structure

- `App.tsx` - Root component with navigation setup
- `src/context/AuthContext.tsx` - Authentication state management
- `src/navigation/RootNavigator.tsx` - Conditional navigation (auth vs main vs tutorial)
- `src/screens/` - Screen components organized by feature
  - `auth/` - Login/Register screens
  - Main screens: Home, Appointments, Diary, Profile, Alerts, Tutorial
- `src/services/` - API layer (auth, alerts, main api client)
- `src/styles/` - Theme configuration

### Import Aliases

TypeScript and Babel are configured with path aliases:
- `@screens/*` → `src/screens/*`
- `@components/*` → `src/components/*` 
- `@navigation/*` → `src/navigation/*`
- `@services/*` → `src/services/*`
- `@context/*` → `src/context/*`
- `@styles/*` → `src/styles/*`

### API Configuration

- Base URL configured via `expo-constants` from `app.json` extra field
- Default: `http://10.0.2.2:8000` (Android emulator localhost)
- Authentication uses Bearer tokens via axios interceptors

### Navigation Structure

- Unauthenticated: Login/Register screens
- New users: Tutorial screen (hasCompletedTutorial: false)
- Authenticated: Bottom tab navigation (Home/Citas/Diario/Perfil) + modal Alerts screen

### Platform-specific Features

- iOS: Location permission descriptions in Info.plist
- Android: Fine/coarse location permissions for emergency alerts
- Cross-platform: Expo notifications, gesture handling, reanimated