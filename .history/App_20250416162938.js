import React from 'react';
import { Platform } from 'react-native'; // ✅ Import Platform
import HomeScreen from './screens/HomeScreen';

// ✅ Import global CSS for web only
if (Platform.OS === 'web') {
  require('./styles/global.css');
}

export default function App() {
  return <HomeScreen />;
}
