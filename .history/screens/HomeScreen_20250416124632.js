import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getFixturesByDate } from '../services/fetchFixtures';

const dates = [
  { label: 'Mon', date: '14' },
  { label: 'Tue', date: '15' },
  { label: 'Today', date: '16', active: true },
  { label: 'Thu', date: '17' },
  { label: 'Fri', date: '18' },
];

export default function HomeScreen() {
  const [fixtures, setFixtures] = useState([]);
  const today = '2025-04-16'; // Format: YYYY-MM-DD

  useEffect(() => {
    getFixturesByDate(today).then(setFixtures);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.monthText}>April 2025</Text>

      <View style={styles.dateTabs}>
        {dates.map((item, index) => (
          <TouchableOpacity key={index} style={styles.dateItem}>
            <Text style={[styles.dateLabel, item.active && styles.activeText]}>
              {item.label}
            </Text>
            <Text style={[styles.dateNumber, item.active && styles.activeText]}>
              {item.date}
            </Text>
            {item.active && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Enter a team or competition"
        style={styles.searchInput}
      />

      <Text style={styles.showScorers}>⚽ Show Scorers</Text>

      {/* LIVE FIXTURES SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Fixtures</Text>

        {fixtures.length === 0 ? (
          <Text style={styles.noData}>No matches found.</Text>
        ) : (
          fixtures.map((match) => (
            <View key={match.idEvent} style={styles.card}>
              <Text style={styles.teamRow}>
                {match.strHomeTeam} vs {match.strAwayTeam}
              </Text>
              <Text style={styles.matchTime}>{match.strTime}</Text>
              {match.intHomeScore !== null && (
                <Text style={styles.agg}>
                  {match.intHomeScore} - {match.intAwayScore} {match.strStatus}
                </Text>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateItem: {
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#333',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeText: {
    color: 'green',
  },
  activeLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'green',
    marginTop: 4,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  showScorers: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamRow: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  matchTime: {
    fontSize: 14,
    color: '#333',
  },
  agg: {
    fontSize: 12,
    color: '#777',
  },
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
