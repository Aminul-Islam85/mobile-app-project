import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function MatchCard({ match }) {
  const navigation = useNavigation();  

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MatchDetails', { fixtureId: match.fixture.id })}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Time and Score Column */}
          <View style={styles.leftColumn}>
            <Text style={styles.matchTime}>{match.fixture.date.slice(11, 16)}</Text>
            {match.goals.home !== null && (
              <Text style={styles.score}>
                {match.goals.home} - {match.goals.away} {match.fixture.status.short}
              </Text>
            )}
          </View>

          {/* Home Team */}
          <View style={styles.teamColumn}>
            <Image source={{ uri: match.teams.home.logo }} style={styles.logo} />
            <Text style={[styles.teamName, { textAlign: 'left' }]} numberOfLines={1}>
              {match.teams.home.name}
            </Text>
          </View>

          {/* VS Column */}
          <View style={styles.vsColumn}>
            <Text style={styles.vs}>vs</Text>
          </View>

          {/* Away Team */}
          <View style={styles.teamColumn}>
            <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>
              {match.teams.away.name}
            </Text>
            <Image source={{ uri: match.teams.away.logo }} style={styles.logo} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  teamColumn: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsColumn: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
  },
  vs: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  matchTime: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  score: {
    fontSize: 12,
    color: '#777',
  },
});
