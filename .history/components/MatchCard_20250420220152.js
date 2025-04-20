import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MatchCard({ match }) {
  return (
    <View style={styles.card}>
      <View style={styles.teamRow}>
        <View style={styles.teamSection}>
          <Image source={{ uri: match.teams.home.logo }} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.teamName, { textAlign: 'left' }]} numberOfLines={1}>
            {match.teams.home.name}
          </Text>
        </View>

        <View style={styles.vsSection}>
          <Text style={styles.vs}>vs</Text>
        </View>

        <View style={styles.teamSection}>
          <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>
            {match.teams.away.name}
          </Text>
          <Image source={{ uri: match.teams.away.logo }} style={styles.logo} resizeMode="contain" />
        </View>
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
  teamName: {
    fontSize: 14,
    fontWeight: '600',
  },
  vs: {
    fontSize: 14,
    marginHorizontal: 6,
    fontWeight: 'bold',
  },
  matchTime: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  score: {
    fontSize: 12,
    color: '#777',
  },
});
