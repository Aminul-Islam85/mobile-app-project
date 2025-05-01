import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // ⭐ Import star icon

export default function MatchCard({ match, onFollowTeam, followedTeams = [] }) {
  const navigation = useNavigation();

  const handleFollow = (teamName) => {
    if (onFollowTeam) {
      onFollowTeam(teamName);
    }
  };

  const isHomeFollowed = followedTeams.includes(match.teams.home.name);
  const isAwayFollowed = followedTeams.includes(match.teams.away.name);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MatchDetails', { fixtureId: match.fixture.id })}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Time and Score Column */}
          <View style={styles.leftColumn}>
            <Text style={styles.matchTime}>
              {match.fixture.date.slice(11, 16)}
              {['1H', '2H'].includes(match.fixture.status.short) && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}> 🔴 Live</Text>
              )}
            </Text>

            {match.goals.home !== null && (
              <Text style={styles.score}>
                {match.goals.home} - {match.goals.away} {match.fixture.status.short}
              </Text>
            )}
          </View>

          {/* Home Team */}
          <View style={styles.teamColumn}>
            <Image source={{ uri: match.teams.home.logo }} style={styles.logo} />
            <View style={styles.teamNameRow}>
              <Text style={[styles.teamName, { textAlign: 'left' }]} numberOfLines={1}>
                {match.teams.home.name}
              </Text>
              <TouchableOpacity onPress={() => handleFollow(match.teams.home.name)}>
                <Feather
                  name="star"
                  size={18}
                  color={isHomeFollowed ? "#FFD700" : "#666"} // ⭐ GOLD if followed
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* VS Column */}
          <View style={styles.vsColumn}>
            <Text style={styles.vs}>vs</Text>
          </View>

          {/* Away Team */}
          <View style={styles.teamColumn}>
            <View style={styles.teamNameRow}>
              <TouchableOpacity onPress={() => handleFollow(match.teams.away.name)}>
                <Feather
                  name="star"
                  size={18}
                  color={isAwayFollowed ? "#FFD700" : "#666"} // ⭐ GOLD if followed
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>
                {match.teams.away.name}
              </Text>
            </View>
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
  teamNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 80,
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
