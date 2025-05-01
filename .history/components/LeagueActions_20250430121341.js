import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LeagueActions() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TopScorers')}
        style={[styles.button, styles.topScorers]}
      >
        <Text style={styles.text}>🥇 View Top Scorers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Standings')}
        style={[styles.button, styles.standings]}
      >
        <Text style={styles.text}>📊 View Standings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    borderRadius: 6,
  },
  topScorers: {
    backgroundColor: '#dff0d8',
  },
  standings: {
    backgroundColor: '#d9edf7',
  },
  text: {
    fontWeight: 'bold',
  },
});
