import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopScorersScreen from '../screens/TopScorersScreen';
import StandingsScreen from '../screens/StandingsScreen';

const Tab = createMaterialTopTabNavigator();

export default function LeagueTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Top Scorers" component={TopScorersScreen} />
      <Tab.Screen name="Standings" component={StandingsScreen} />
    </Tab.Navigator>
  );
}
