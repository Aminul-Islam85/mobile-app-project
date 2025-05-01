import React, { useEffect, useState, useRef } from 'react';
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
import FixturesSection from '../components/FixturesSection';
import LeagueFilter from '../components/LeagueFilter'; 
import LeagueActions from '../components/LeagueActions';
import { format, addDays } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
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
  const [showFavorites, setShowFavorites] = useState(false);
  const [followedTeams, setFollowedTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const availableLeagues = Array.from(
    new Set(fixtures.map(f => f.league.name).filter(name => name && name !== 'Select League'))
  );

  const datePickerRef = useRef();

  const handleUserIconPress = () => {
    if (auth.currentUser) {
      const confirmed = window.confirm('Do you want to logout?');
      if (confirmed) {
        signOut(auth)
          .then(() => {
            console.log('User logged out successfully.');
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      }
    } else {
      navigation.navigate('Auth');
    }
  };

  const handleFollowTeam = (teamName) => {
    if (!auth.currentUser) {
      Alert.alert('Authentication', 'Please login to follow teams.');
      return;
    }
    if (!followedTeams.includes(teamName)) {
      setFollowedTeams([...followedTeams, teamName]);
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
      }, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedDate]);

  const filteredFixtures = fixtures.filter((match) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      match.teams?.home?.name?.toLowerCase().includes(query) ||
      match.teams?.away?.name?.toLowerCase().includes(query) ||
      match.league?.name?.toLowerCase().includes(query);

    const matchesLeague = selectedLeague ? match.league?.name === selectedLeague : true;

    return matchesSearch && matchesLeague;
  });

  const groupedFixtures = groupByLeague(filteredFixtures);

  const preferredOrder = [
    'Premier League (England)',
    'La Liga (Spain)',
    'Bundesliga 1 (Germany)',
    'Ligue 1 (France)',
    'UEFA Champions League (Europe)',
    'UEFA Europa League (Europe)',
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
      {/* Web Top Right Corner */}
      {Platform.OS === 'web' && (
        <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => datePickerRef.current.setOpen(true)}
            style={{ marginRight: 10 }}
          >
            <MaterialIcons name="calendar-today" size={26} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUserIconPress}>
            <Feather name="user" size={26} color="#000" />
          </TouchableOpacity>

          <DatePicker
            ref={datePickerRef}
            selected={new Date(selectedDate)}
            onChange={(date) => {
              if (date) {
                const formatted = format(date, 'yyyy-MM-dd');
                setSelectedDate(formatted);
                setDateTabs(generateDateTabs(new Date(formatted)));
              }
            }}
            withPortal
            portalId="root-portal"
            style={{ display: 'none' }}
            customInput={<View />}
          />
        </View>
      )}

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.monthText}>{format(new Date(selectedDate), 'MMMM yyyy')}</Text>

        {Platform.OS !== 'web' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <MaterialIcons name="calendar-today" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 8 }}
              onPress={handleUserIconPress}
            >
              <Feather name="user" size={24} color="#000" />
            </TouchableOpacity>
          </View>
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

      <LeagueActions />

      <LeagueFilter
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        availableLeagues={availableLeagues}
      />

      {/* Scorers */}
      <TouchableOpacity onPress={() => setShowFavorites(!showFavorites)}>
        <Text style={styles.showScorers}>⭐ My Followed Teams</Text>
      </TouchableOpacity>

      {showFavorites && (
        <View style={{ padding: 10 }}>
          {followedTeams.length === 0 ? (
            <Text style={{ fontStyle: 'italic' }}>No followed teams yet.</Text>
          ) : (
            followedTeams.map((team, index) => (
              <Text key={index} style={{ marginBottom: 5 }}>
                {team}
              </Text>
            ))
          )}
        </View>
      )}

      <FixturesSection
  groupedFixtures={sortedGroupedFixtures}
  onFollowTeam={handleFollowTeam}
  followedTeams={followedTeams}
/>


      {/* Mobile Date Picker */}
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
