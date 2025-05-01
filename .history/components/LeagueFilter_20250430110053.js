import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

export default function LeagueFilter({ selectedLeague, setSelectedLeague, availableLeagues }) {
  const preferredOrder = [
    'Premier League (England)',
    'La Liga (Spain)',
    'Bundesliga 1 (Germany)',
    'Ligue 1 (France)',
    'UEFA Champions League (Europe)',
    'UEFA Europa League (Europe)',
    'UEFA Nations League (Europe)',
  ];

  const leagueOptions = [
    // First: preferred leagues in exact order
    ...preferredOrder
      .filter(name => availableLeagues.includes(name))
      .map(name => ({ label: name, value: name })),

    // Then: all other leagues alphabetically
    ...availableLeagues
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
        items={leagueOptions}
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
