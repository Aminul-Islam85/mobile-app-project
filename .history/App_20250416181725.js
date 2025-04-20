import React from 'react';
import { Platform } from 'react-native'; 
import HomeScreen from './screens/HomeScreen';


if (Platform.OS === 'web') {
  require('./styles/global.css');
}

export default function App() {
  return <HomeScreen />;
}
