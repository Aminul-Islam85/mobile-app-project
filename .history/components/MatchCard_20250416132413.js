import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MatchCard({ match, homeLogo, awayLogo }) {
  return (
    <View style={styles.card}>
      <View style={styles.teamRow}>
        <Image source={{ uri: homeLogo }} style={styles.logo} />
        <Text style={styles.teamName}>{match.strHomeTeam}</Text>

        <Text style={styles.vs}>vs</Text>

        <Text style={styles.teamName}>{match.strAwayTeam}</Text>
        <Image source={{ uri: awayLogo }} style={styles.logo} />
      </View>

      <Text style={styles.matchTime}>{match.strTime}</Text>

      {match.intHomeScore !== null && (
        <Text style={styles.score}>
          {match.intHomeScore} - {match.intAwayScore} {match.strStatus}
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
    resizeMode: 'contain',
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
