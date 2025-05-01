import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getTopScorers } from '../services/api'; // You’ll create this next

export default function TopScorersScreen() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTopScorers({ league: 39, season: 2024 });
        setScorers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={styles.container}>
      {scorers.map((player, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.name}>{player.player.name}</Text>
          <Text style={styles.stat}>Goals: {player.statistics[0].goals.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 12, backgroundColor: '#eee', padding: 12, borderRadius: 6 },
  name: { fontSize: 16, fontWeight: 'bold' },
  stat: { fontSize: 14 },
});
