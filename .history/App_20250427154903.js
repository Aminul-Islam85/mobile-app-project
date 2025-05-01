import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import HomeScreen from './screens/HomeScreen'; 
import MatchDetailsScreen from './screens/MatchDetailsScreen';
import AuthScreen from './screens/AuthScreen';

if (Platform.OS === 'web') {
  require('./styles/global.css');
}


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />

        
        <Stack.Screen 
          name="MatchDetails" 
          component={MatchDetailsScreen} 
        /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
