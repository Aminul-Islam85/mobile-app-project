import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator'; // ✅ This manages all screens

if (Platform.OS === 'web') {
  require('./styles/global.css');
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
