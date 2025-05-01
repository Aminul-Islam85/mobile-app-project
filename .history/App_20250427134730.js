import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 👈 ADD
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // 👈 ADD

import HomeScreen from './screens/HomeScreen'; 
// (Later you will import MatchDetailsScreen too when you create it)

if (Platform.OS === 'web') {
  require('./styles/global.css');
}

// Create Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> {/* 👈 Wrap everything */}
      <Stack.Navigator>
        {/* Main Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hide header for home
        />

        {/* Later you will add more screens here like MatchDetails */}
        {/* Example: 
        <Stack.Screen 
          name="MatchDetails" 
          component={MatchDetailsScreen} 
        /> 
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
