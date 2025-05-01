import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import styles from '../styles/HomeScreenStyles';
import { getFixturesByDate } from '../services/fetchFixtures';
import MatchCard from '../components/MatchCard';
import { format, addDays } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { auth, signOut } from '../services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const generateDateTabs = (baseDate = new Date()) => {
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    const date = addDays(baseDate, i);
    dates.push({
      label: format(date, 'EEE'),
      date: format(date, 'yyyy-MM-dd'),
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    });
  }
  return dates;
};

const groupByLeague = (fixtures) => {
  const grouped = {};
  fixtures.forEach((match) => {
    let leagueName = match.league?.name || 'Other';
    const country = match.league?.country || '';

    leagueName = leagueName.replace(/^\d+\.\s*/, '');
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
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged out successfully!');
      navigation.replace('Auth');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error logging out.');
    }
  };

  useEffect(() => {
    let intervalId;

    const fetchFixtures = async () => {
      const data = await getFixturesByDate(selectedDate);
      setFixtures(data);
    };

    fetchFixtures();

    if (selectedDate === format(new Date(), 'yyyy-MM-dd')) {
      intervalId = setInterval(() => {
        fetchFixtures();
      }, 30000); // 30 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedDate]);

  const filteredFixtures = fixtures.filter((match) => {
    const query = searchQuery.toLowerCase();
    return (
      match.teams?.home?.name?.toLowerCase().includes(query) ||
      match.teams?.away?.name?.toLowerCase().includes(query) ||
      match.league?.name?.toLowerCase().includes(query)
    );
  });

  const groupedFixtures = groupByLeague(filteredFixtures);

  const preferredOrder = [
    'Premier League (England)',
    'La Liga (Spain)',
    'Bundesliga 1 (Germany)',
    'Ligue 1 (France)',
    'UEFA Champions League (Europe)',
    'UEFA Europa League (Europe)',
    'UEFA Europa Conference League (Europe)',
    'UEFA Nations League (Europe)',
  ];

  const sortedGroupedFixtures = Object.entries(groupedFixtures).sort(([a], [b]) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <ScrollView style={styles.container}>
      
      {/* 🔥 Logout Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Web Date Picker */}
      {Platform.OS === 'web' && (
        <View style={styles.datePickerWebWrapper}>
          <DatePicker
            selected={new Date(selectedDate)}
            onChange={(date) => {
              setShowCalendar(false);
              if (date) {
                const formatted = format(date, 'yyyy-MM-dd');
                setSelectedDate(formatted);
                setDateTabs(generateDateTabs(new Date(formatted)));
              }
            }}
            popperPlacement="bottom-end"
            popperModifiers={[
              { name: 'offset', options: { offset: [0, 10] } },
              { name: 'preventOverflow', options: { boundary: 'viewport' } },
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
            onPress={() => setSelectedDate(item.date)}
          >
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Scorers */}
      <Text style={styles.showScorers}>⚽ Show Scorers</Text>

      {/* Fixtures */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Fixtures</Text>
        {filteredFixtures.length === 0 ? (
          <Text style={styles.noData}>No matches found.</Text>
        ) : (
          sortedGroupedFixtures.map(([league, matches]) => (
            <View key={league} style={styles.section}>
              <Text style={styles.sectionTitle}>{league}</Text>
              {matches.map((match) => (
                <MatchCard key={match.fixture?.id} match={match} />
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
              setDateTabs(generateDateTabs(date));
            }
          }}
        />
      )}
    </ScrollView>
  );
}
