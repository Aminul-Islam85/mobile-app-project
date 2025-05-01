import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import TopScorersScreen from '../screens/TopScorersScreen'; // ✅ Import
import StandingsScreen from '../screens/StandingsScreen';   // ✅ Import

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
      <Stack.Screen name="TopScorers" component={TopScorersScreen} />  {/* ✅ Add this */}
      <Stack.Screen name="Standings" component={StandingsScreen} />    {/* ✅ Add this */}
    </Stack.Navigator>
  );
}
