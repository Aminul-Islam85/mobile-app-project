import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getStandings } from '../services/api'; // Make sure this function exists

export default function StandingsScreen() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStandings({ league: 39, season: 2024 }); // Premier League example
        setStandings(data[0]?.league?.standings[0] || []);
      } catch (error) {
        console.error('Error fetching standings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Team Standings</Text>
      {standings.map((team, index) => (
        <View key={team.team.id} style={styles.row}>
          <Text style={styles.position}>{team.rank}.</Text>
          <Text style={styles.team}>{team.team.name}</Text>
          <Text style={styles.points}>{team.points} pts</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  position: { width: 30, fontWeight: 'bold' },
  team: { flex: 1 },
  points: { width: 60, textAlign: 'right', fontWeight: 'bold' },
});
