# Detox E2E Testing Setup

This document explains how to run Detox end-to-end tests for the UNIHealth mobile app.

## Prerequisites

### iOS Testing
- macOS machine
- Xcode installed
- iOS Simulator
- Expo Dev Client installed on simulator

### Android Testing  
- Android Studio with SDK
- Android Emulator (Pixel_7_API_33 recommended)
- Expo Dev Client installed on emulator

## Installation

Dependencies are already installed via `package.json`:
- `detox`: Main testing framework
- `detox-expo-helpers`: Expo-specific utilities
- `jest`: Test runner

## Configuration

The Detox setup includes:
- `.detoxrc.json`: Main configuration
- `e2e/jest.config.js`: Jest test runner config
- `e2e/init.js`: Setup helpers for Expo

## Running Tests

### iOS
```bash
# Build the app for testing
npm run build:ios

# Run tests
npm run test:e2e:ios
```

### Android
```bash
# Build the app for testing  
npm run build:android

# Run tests
npm run test:e2e:android
```

## Test Structure

Tests are located in the `e2e/` directory:

- `welcome.test.js`: Welcome screen navigation
- `authentication.test.js`: Login/registration flows
- `tutorial.test.js`: Tutorial navigation
- `navigation.test.js`: Main app navigation

## Test IDs

Components include `testID` props for reliable element selection:

### Login Screen
- `email-input`: Email input field
- `password-input`: Password input field  
- `login-button`: Login submit button

### Registration Screen
- `email-input`: Email input (phase 1)
- `password-input`: Password input (phase 1)
- `confirm-password-input`: Password confirmation (phase 1)
- `name-input`: Name input (phase 1)
- `cedula-input`: ID number input (phase 1)
- `birth-date-input`: Birth date input (phase 2)
- `phone-input`: Phone input (phase 2)
- `blood-type-input`: Blood type input (phase 3)

### Home Screen
- `emergency-alert-button`: Emergency alert button

### Tutorial Screen
- `progress-dots`: Tutorial progress indicators

## Development Workflow

1. **Write Tests**: Add test files to `e2e/` directory
2. **Add Test IDs**: Include `testID` props in components
3. **Run Locally**: Test on iOS/Android simulators
4. **CI/CD**: Tests run automatically on PR/push

## CI/CD Integration

GitHub Actions workflow (`.github/workflows/detox.yml`) runs tests on:
- Push to `main`/`develop` branches
- Pull requests to `main`

The workflow:
1. Sets up Node.js and dependencies
2. Configures iOS Simulator or Android Emulator
3. Starts Expo development server
4. Builds the app for testing
5. Runs Detox tests
6. Uploads artifacts on failure

## Troubleshooting

### iOS Issues
- Ensure Xcode command line tools are installed
- Check iOS Simulator is running correct device type
- Verify Expo Dev Client is installed on simulator

### Android Issues
- Ensure Android SDK is properly configured
- Check emulator is running and accessible via ADB
- Verify AVD matches configuration in `.detoxrc.json`

### Expo Issues
- Ensure development server is running
- Check that dev client can connect to metro server
- Verify network connectivity between test runner and Expo

### Test Failures
- Check test logs for element selection issues
- Verify testID props are correctly added
- Ensure app state is properly reset between tests

## Best Practices

1. **Reliable Selectors**: Use testID over text/accessibility labels
2. **Test Isolation**: Each test should be independent
3. **Realistic Data**: Use actual API responses where possible  
4. **Error Scenarios**: Test both success and failure flows
5. **Performance**: Keep tests focused and efficient

## Adding New Tests

1. Create test file in `e2e/` directory
2. Import required helpers from `detox-expo-helpers`
3. Add `beforeEach` with `reloadApp()` for clean state
4. Use descriptive test names and structure
5. Add necessary testID props to components
6. Test on both iOS and Android before committing