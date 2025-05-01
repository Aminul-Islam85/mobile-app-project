import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 

import AppNavigator from './navigation/AppNavigator'; // ✅ Import the central navigator

if (Platform.OS === 'web') {
  require('./styles/global.css'); // ✅ Global styles for web
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator /> {/* ✅ All routes handled from one place */}
    </NavigationContainer>
  );
}
