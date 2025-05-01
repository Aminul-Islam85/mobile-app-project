import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { getMatchDetails } from '../services/fetchMatchDetails';

export default function MatchDetailsScreen({ route }) {
  const { fixtureId } = route.params;
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getMatchDetails(fixtureId);
      setMatchDetails(details);
      setLoading(false);
    };
    fetchDetails();
  }, [fixtureId]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />;
  }

  if (!matchDetails) {
    return <Text style={{ padding: 16 }}>No Match Details Found.</Text>;
  }

  const { fixture, teams, goals, league } = matchDetails;

  return (
    <ScrollView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Match Details</Text>

      {/* Teams Row */}
      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <Image source={{ uri: teams.home.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams.home.name}</Text>
        </View>

        <View style={styles.scoreSection}>
          <Text style={styles.score}>
            {goals.home} - {goals.away}
          </Text>
          <Text style={styles.matchStatus}>{fixture.status.long}</Text>
        </View>

        <View style={styles.team}>
          <Image source={{ uri: teams.away.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams.away.name}</Text>
        </View>
      </View>

      {/* Match Info */}
      <View style={styles.matchInfo}>
        <Text>🏟 Stadium: {fixture.venue.name} ({fixture.venue.city})</Text>
        <Text>🕒 {new Date(fixture.date).toLocaleString()}</Text>
        <Text>👨‍⚖️ Referee: {fixture.referee || 'Unknown'}</Text>
        <Text>🏆 {league.name}</Text>
      </View>

      {/* Statistics */}
      <Text style={styles.subHeading}>📊 Statistics:</Text>
      {matchDetails.statistics && matchDetails.statistics.length > 0 ? (
        matchDetails.statistics.map((teamStats, index) => (
          <View key={index} style={styles.statsSection}>
            <Text style={styles.team}>{teamStats.team.name}</Text>
            {teamStats.statistics.map((stat, idx) => (
              <Text key={idx}>{stat.type}: {stat.value}</Text>
            ))}
          </View>
        ))
      ) : (
        <Text>No statistics available.</Text>
      )}

      {/* Lineups */}
      <Text style={styles.subHeading}>🧤 Lineups:</Text>
      {matchDetails.lineups && matchDetails.lineups.length > 0 ? (
        matchDetails.lineups.map((teamLineup, index) => (
          <View key={index} style={styles.statsSection}>
            <Text style={styles.team}>{teamLineup.team.name}</Text>
            <Text>Formation: {teamLineup.formation}</Text>
            {teamLineup.startXI.map((player, idx) => (
              <Text key={idx}>{player.player.name} ({player.player.pos})</Text>
            ))}
          </View>
        ))
      ) : (
        <Text>No lineups available.</Text>
      )}

      {/* Events */}
      <Text style={styles.subHeading}>⚽ Events:</Text>
      {matchDetails.events && matchDetails.events.length > 0 ? (
        matchDetails.events.map((event, index) => (
          <Text key={index}>
            {event.time.elapsed}' - {event.team.name}: {event.player.name} ({event.type} {event.detail})
          </Text>
        ))
      ) : (
        <Text>No events available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  teamsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  team: { alignItems: 'center' },
  teamLogo: { width: 50, height: 50, marginBottom: 4 },
  teamName: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  scoreSection: { alignItems: 'center' },
  score: { fontSize: 24, fontWeight: 'bold' },
  matchStatus: { fontSize: 12, color: 'gray', marginTop: 4 },
  matchInfo: { marginBottom: 20 },
  subHeading: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  statsSection: { marginTop: 12 },
  team: { fontWeight: 'bold', marginBottom: 6 },
});
