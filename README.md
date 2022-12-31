# Recipe Inspire

Expo app which will allows users to scan fruit or veg - this will be pushed up to Google Vision AI to determine what it is, and the app will then give back a list of recommended recipes from the scanned (or manually entered) ingredients.

## Setup

### Prerequisites

- Node 16.17.1
- Android Studio or XCode
- Android or iOS Emulator
- Physical Android or iOS device

### Install

- git clone repo
- cd to project root
- `npm i`
- Have an Android or iOS emulator running or [Expo Go App](https://expo.dev/client) installed
- `npm run start`

## Architecture

### Entry

App.tsx which loads fonts and navigation

### Navigation

This can be found in the /screens directory

- Stack screen
- Tab navigation

We wrap our app round a parent stack screen, which has the tab navigation as one of its child routes. This is done to hide the bottom tab navigation on certain stack screens to increase screen space.

### Hooks

We have 3 custom hooks

- Swipe hook (Grave, K. n.d.) for detecting swipe gestures and having a callback run on event
- Keyboard hook (not used)
- Store hook - to get the instance of stores

### Store

We use use MobX (MobX, n.d.) and React store context and provide this within the app entry.

The store consists of:

- Ingredients
- User
- Common
- Photo

#### Ingredients

This is where we store ingredients, making http calls to fetch results

#### User

This is where we store user credentials, and make calls to firebase

#### Common

Modals and spinner store

#### Photo

This is where store temp images from the camera, and make http calls to google vision ai

## Agent

We use Axios (Axios, n.d.) as our central http agent

Agent consists

- Spoonacular
- Google Vision
- Firebase

We have separate objects to categorise different calls.

We have a separate data folder for local dev calls - as spoonacular api is rate limited

## Acknowledgements

- Axios, n.d. Getting Started (online). Axios. Available from: https://axios-http.com/docs/intro [Accessed 26/12/2022]

- Grave, K. n.d. Detect swipe left in React Native (online). Stackoverflow. Available from: https://stackoverflow.com/questions/45854450/detect-swipe-left-in-react-native [Accessed 26/12/2022]
  adapted to pass parameters to callback

- Jalajpathak, n.d. Food loader (online). LottieFiles. Available from: https://lottiefiles.com/130956-food-loader [Accessed 21/12/2022]

- MobX, n.d. Introduction (online). MobX. Available from: https://mobx.js.org/react-integration.html [Accessed 26/12/2022]
