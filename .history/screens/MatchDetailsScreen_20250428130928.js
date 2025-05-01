import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getMatchDetails } from '../services/fetchMatchDetails';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // ✅ Optional icons (install expo vector icons if not done)

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
    return <ActivityIndicator size="large" color="blue" style={styles.centered} />;
  }

  if (!matchDetails) {
    return <Text style={styles.centered}>No Match Details Found.</Text>;
  }

  const { fixture, teams, goals, league } = matchDetails;
  const stats = matchDetails.statistics || [];
  const lineups = matchDetails.lineups || [];
  const events = matchDetails.events || [];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.team}>
          <Image source={{ uri: teams.home.logo }} style={styles.logo} />
          <Text style={styles.teamName}>{teams.home.name}</Text>
        </View>

        <View style={styles.scoreSection}>
          <Text style={styles.score}>{goals.home} - {goals.away}</Text>
          <Text style={styles.status}>{fixture.status.long}</Text>
        </View>

        <View style={styles.team}>
          <Image source={{ uri: teams.away.logo }} style={styles.logo} />
          <Text style={styles.teamName}>{teams.away.name}</Text>
        </View>
      </View>

      {/* Basic Info */}
      <View style={styles.infoCard}>
        <Text style={styles.info}><Ionicons name="location-outline" size={16} /> {fixture.venue.name} ({fixture.venue.city})</Text>
        <Text style={styles.info}><Ionicons name="calendar-outline" size={16} /> {new Date(fixture.date).toLocaleString()}</Text>
        <Text style={styles.info}><Ionicons name="person-outline" size={16} /> Referee: {fixture.referee || 'Unknown'}</Text>
        <Text style={styles.info}><FontAwesome5 name="trophy" size={16} /> {league.name} ({league.country})</Text>
      </View>

{/* Statistics Section */}
<Text style={styles.subHeading}>📊 Statistics:</Text>
{stats.length > 0 ? (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
    {/* Home Team Stats */}
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8 }}>
      <Text style={styles.team}>{stats[0]?.team.name}</Text>
      {stats[0]?.statistics.map((stat, idx) => (
        <Text key={idx}>{stat.type}: {stat.value}</Text>
      ))}
    </View>

    {/* Away Team Stats */}
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8 }}>
      <Text style={styles.team}>{stats[1]?.team.name}</Text>
      {stats[1]?.statistics.map((stat, idx) => (
        <Text key={idx}>{stat.type}: {stat.value}</Text>
      ))}
    </View>
  </View>
) : (
  <Text>No statistics available.</Text>
)}


      {/* Lineups Section */}
<Text style={styles.subHeading}>🧤 Lineups:</Text>
{lineups.length > 0 ? (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
    {/* Home Team Lineup */}
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8 }}>
      <Text style={styles.team}>{lineups[0]?.team.name}</Text>
      <Text>Formation: {lineups[0]?.formation}</Text>
      {lineups[0]?.startXI.map((player, idx) => (
        <Text key={idx}>{player.player.name} ({player.player.pos})</Text>
      ))}
    </View>

    {/* Away Team Lineup */}
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8 }}>
      <Text style={styles.team}>{lineups[1]?.team.name}</Text>
      <Text>Formation: {lineups[1]?.formation}</Text>
      {lineups[1]?.startXI.map((player, idx) => (
        <Text key={idx}>{player.player.name} ({player.player.pos})</Text>
      ))}
    </View>
  </View>
) : (
  <Text>No lineups available.</Text>
)}


      {/* Events */}
      <Text style={styles.sectionTitle}>⚽ Events</Text>
      {events.length > 0 ? events.map((event, index) => (
        <View key={index} style={styles.eventRow}>
          <Text style={styles.eventTime}>{event.time.elapsed}'</Text>
          <Text style={styles.eventDetail}>
            {event.team.name} - {event.player.name} ({event.type} {event.detail})
          </Text>
        </View>
      )) : (
        <Text style={styles.empty}>No events available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  team: { alignItems: 'center', width: '30%' },
  logo: { width: 50, height: 50, marginBottom: 6 },
  teamName: { fontWeight: 'bold', textAlign: 'center', fontSize: 14 },
  scoreSection: { alignItems: 'center' },
  score: { fontSize: 28, fontWeight: 'bold' },
  status: { fontSize: 14, color: 'gray' },
  infoCard: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 20 },
  info: { fontSize: 14, marginVertical: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  card: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginBottom: 16 },
  teamTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  detail: { fontSize: 14, marginBottom: 4 },
  empty: { fontStyle: 'italic', color: 'gray', marginBottom: 10 },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  eventTime: { fontWeight: 'bold', width: 40 },
  eventDetail: { fontSize: 14, flexShrink: 1 },
});
