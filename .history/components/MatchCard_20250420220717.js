import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MatchCard({ match }) {
  return (
    <View style={styles.card}>
      <View style={styles.teamRow}>
        <Image source={{ uri: match.teams.home.logo }} style={styles.logo} resizeMode="contain" />
        
        <View style={styles.nameWrapper}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.teams.home.name}
          </Text>
        </View>

        <Text style={styles.vs}>vs</Text>

        <View style={styles.nameWrapper}>
          <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>
            {match.teams.away.name}
          </Text>
        </View>

        <Image source={{ uri: match.teams.away.logo }} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.matchTime}>{match.fixture.date.slice(11, 16)}</Text>

      {match.goals.home !== null && (
        <Text style={styles.score}>
          {match.goals.home} - {match.goals.away} {match.fixture.status.short}
        </Text>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 24,
    height: 24,
  },
  nameWrapper: {
    flex: 1.8, // enough space for names, same for both
    paddingHorizontal: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
  },
  vs: {
    fontSize: 14,
    marginHorizontal: 6,
    fontWeight: 'bold',
    width: 20,
    textAlign: 'center',
  },
  matchTime: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  score: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});
