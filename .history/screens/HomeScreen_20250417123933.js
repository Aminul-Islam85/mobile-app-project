import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { getFixturesByDate } from '../services/fetchFixtures';
import MatchCard from '../components/MatchCard';
import { format, addDays } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const generateDateTabs = () => {
  const today = new Date();
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    const date = addDays(today, i);
    dates.push({
      label: format(date, 'EEE'),
      date: format(date, 'yyyy-MM-dd'),
      isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
    });
  }
  return dates;
};

const groupByLeague = (fixtures) => {
  const grouped = {};
  fixtures.forEach((match) => {
    const leagueName = match.league?.name || 'Other';
    const country = match.league?.country || '';
    const groupKey = `${leagueName} (${country})`;

    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(match);
  });
  return grouped;
};



export default function HomeScreen() {
  const [fixtures, setFixtures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateTabs, setDateTabs] = useState(generateDateTabs());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    getFixturesByDate(selectedDate).then(setFixtures);
  }, [selectedDate]);

  const groupedFixtures = groupByLeague(fixtures);

  return (
    <ScrollView style={styles.container}>
      {/* Web Date Picker */}
      {Platform.OS === 'web' && (
        <View style={styles.datePickerWebWrapper}>
        <DatePicker
  selected={new Date(selectedDate)}
  onChange={(date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    setSelectedDate(formatted);
    setDateTabs(generateDateTabs());
  }}
  popperPlacement="bottom-end"
  popperModifiers={[
    {
      name: 'offset',
      options: {
        offset: [0, 10], 
      },
    },
    {
      name: 'preventOverflow',
      options: {
        boundary: 'viewport', 
      },
    },
  ]}
  portalId="root-portal" 
  withPortal
  customInput={
    <TouchableOpacity style={styles.datePickerWebButton}>
      <MaterialIcons name="calendar-today" size={24} color="#000" />
    </TouchableOpacity>
  }
/>


        </View>
      )}

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.monthText}>{format(new Date(selectedDate), 'MMMM yyyy')}</Text>

        {Platform.OS !== 'web' && (
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <MaterialIcons name="calendar-today" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Date Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateTabs}>
        {dateTabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dateItem}
            onPress={() => setSelectedDate(item.date)}>
            <Text style={[styles.dateLabel, item.date === selectedDate && styles.activeText]}>
              {item.isToday ? 'Today' : item.label}
            </Text>
            <Text style={[styles.dateNumber, item.date === selectedDate && styles.activeText]}>
              {item.date.split('-')[2]}
            </Text>
            {item.date === selectedDate && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search */}
      <TextInput
        placeholder="Enter a team or competition"
        style={styles.searchInput}
      />

      {/* Scorers */}
      <Text style={styles.showScorers}>⚽ Show Scorers</Text>

      {/* Fixtures */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Fixtures</Text>
        {fixtures.length === 0 ? (
          <Text style={styles.noData}>No matches found.</Text>
        ) : (
          Object.entries(groupedFixtures).map(([league, matches]) => (
            <View key={league} style={styles.section}>
              <Text style={styles.sectionTitle}>{league}</Text>
              {matches.map((match) => (
                <MatchCard key={match.idEvent} match={match} />
              ))}
            </View>
          ))
        )}
      </View>

      {/* Mobile Calendar */}
      {Platform.OS !== 'web' && showCalendar && (
        <DateTimePicker
          value={new Date(selectedDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowCalendar(false);
            if (date) {
              const formatted = format(date, 'yyyy-MM-dd');
              setSelectedDate(formatted);
              setDateTabs(generateDateTabs());
            }
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTabs: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 8,
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
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  datePickerWebWrapper: {
    alignItems: 'flex-end',
    marginBottom: 10,
    position: 'relative',
  },
  datePickerWebButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});
