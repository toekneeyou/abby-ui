# Abby

This is the UI for Abby

## Table Of Contents

- [Getting Started](#getting-started)
  - [Clone Repository](#clone-repository)
- [Usage](#usage)
  - [iOS Linkage](#ios-linkage)
  - [Asset Linkage](#asset-linkage)
  - [Running Dev](#running-dev)

## Getting Started

1. Clone Repository

   ```bash
   git clone https://github.com/toekneeyou/abby-ui.git
   ```

2. Setup Environment
   Make sure you have completed the [React Native - Environment Setup (React Native CLI Quickstart)](https://reactnative.dev/docs/environment-setup?guide=native) instructions till "Creating a new application" step, before proceeding.

3. Install Dependencies

   ```bash
   npm i
   ```

4. Set up environmental variables. Use `.env` for variables that aren't dependent on your development environment. Use `.env.development` for `development` environment `.env.production` for `production` environment.

   ```
   API_URL
   ```

## Usage

### Running Dev

1. First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

2. Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

   For Android

   ```bash
   # using npm
   npm run android

   # OR using Yarn
   yarn android
   ```

   For iOS

   ```bash
   # using npm
   npm run ios

   # OR using Yarn
   yarn ios
   ```

   If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

   This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

3. If you want to run the app on your own device, follow the instructions [here](https://reactnative.dev/docs/running-on-device)

### iOS Linkage

Remember to update iOS dependencies whenever you install new libraries that include native modules with the following command:

```bash
npx pod-install ios
```

### Asset Linkage

When you add assets, make sure to link the assets to iOS and Android with the following command:

```bash
npx react-native-asset
```
