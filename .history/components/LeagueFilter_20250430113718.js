import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

export default function LeagueFilter({ selectedLeague, setSelectedLeague, availableLeagues }) {
  const preferredOrder = [
    'Premier League',
    'La Liga',
    'Bundesliga 1',
    'Ligue 1',
    'UEFA Champions League',
    'UEFA Europa League',
    'UEFA Nations League',
  ];

  const uniqueLeagues = Array.from(new Set(
    availableLeagues.filter(name => {
      if (!name) return false;
      return name.trim().toLowerCase() !== 'select league';
    })
  ));
  
  
  const sortedLeagues = [
    // Put preferred leagues first
    ...preferredOrder
      .filter(name => uniqueLeagues.includes(name))
      .map(name => ({ label: name, value: name })),

    // Then add the rest alphabetically (excluding preferred already added)
    ...uniqueLeagues
      .filter(name => !preferredOrder.includes(name))
      .sort()
      .map(name => ({ label: name, value: name })),
  ];

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedLeague(value)}
        value={selectedLeague}
        placeholder={{ label: 'Select League', value: null }}
        items={sortedLeagues}
        style={pickerSelectStyles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
};
