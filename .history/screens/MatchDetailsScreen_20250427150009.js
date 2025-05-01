import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
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
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (!matchDetails) {
    return <Text>No Match Details Found.</Text>;
  }

  const { teams, venue, referee } = matchDetails.fixture || {};
  const stats = matchDetails.statistics || [];
  const lineups = matchDetails.lineups || [];
  const events = matchDetails.events || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Match Details</Text>
      <Text>🏟 Stadium: {venue?.name} ({venue?.city})</Text>
      <Text>👨‍⚖️ Referee: {referee || 'Unknown'}</Text>
      <Text>⚽ {teams?.home?.name} vs {teams?.away?.name}</Text>

      {/* Statistics Section */}
      <Text style={styles.subHeading}>📊 Statistics:</Text>
      {stats.length > 0 ? stats.map((teamStats, index) => (
        <View key={index} style={styles.statsSection}>
          <Text style={styles.team}>{teamStats.team.name}</Text>
          {teamStats.statistics.map((stat, idx) => (
            <Text key={idx}>{stat.type}: {stat.value}</Text>
          ))}
        </View>
      )) : (
        <Text>No statistics available.</Text>
      )}

      {/* Lineups Section */}
      <Text style={styles.subHeading}>🧤 Lineups:</Text>
      {lineups.length > 0 ? lineups.map((teamLineup, index) => (
        <View key={index} style={styles.statsSection}>
          <Text style={styles.team}>{teamLineup.team.name}</Text>
          <Text>Formation: {teamLineup.formation}</Text>
          {teamLineup.startXI.map((player, idx) => (
            <Text key={idx}>{player.player.name} ({player.player.pos})</Text>
          ))}
        </View>
      )) : (
        <Text>No lineups available.</Text>
      )}

      {/* Events Section */}
      <Text style={styles.subHeading}>⚽ Events:</Text>
      {events.length > 0 ? events.map((event, index) => (
        <Text key={index}>
          {event.time.elapsed}' - {event.team.name}: {event.player.name} ({event.type} {event.detail})
        </Text>
      )) : (
        <Text>No events available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  subHeading: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  statsSection: { marginTop: 12 },
  team: { fontWeight: 'bold', marginBottom: 4 },
});
