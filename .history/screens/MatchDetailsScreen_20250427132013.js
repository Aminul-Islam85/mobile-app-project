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

  const { teams, venue, referee } = matchDetails.fixture;
  const stats = matchDetails.statistics || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Match Details</Text>
      <Text>🏟 Stadium: {venue?.name} ({venue?.city})</Text>
      <Text>👨‍⚖️ Referee: {referee || 'Unknown'}</Text>
      <Text>⚽ {teams?.home?.name} vs {teams?.away?.name}</Text>

      {/* You can extend here: Lineups, Statistics, etc */}
      <Text style={styles.subHeading}>Statistics:</Text>
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
