import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import AuthScreen from '../screens/AuthScreen';
import TopScorersScreen from '../screens/TopScorersScreen';
import StandingsScreen from '../screens/StandingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Authentication' }} />
      <Stack.Screen name="TopScorers" component={TopScorersScreen} />
      <Stack.Screen name="Standings" component={StandingsScreen} />
    </Stack.Navigator>
  );
}
