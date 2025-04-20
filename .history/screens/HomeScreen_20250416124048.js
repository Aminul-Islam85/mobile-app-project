import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getFixturesByDate } from '../services/fetchFixtures';


const dates = [
  { label: 'Mon', date: '14' },
  { label: 'Tue', date: '15' },
  { label: 'Today', date: '16', active: true },
  { label: 'Thu', date: '17' },
  { label: 'Fri', date: '18' },
];

export default function HomeScreen() {
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
});
