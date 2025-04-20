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
import { getTeamLogo } from '../services/fetchTeamLogo';
import MatchCard from '../components/MatchCard';

const dates = [
  { label: 'Mon', date: '14' },
  { label: 'Tue', date: '15' },
  { label: 'Today', date: '16', active: true },
  { label: 'Thu', date: '17' },
  { label: 'Fri', date: '18' },
];

const groupByLeague = (fixtures) => {
  const grouped = {};
  fixtures.forEach((match) => {
    const league = match.strLeague || 'Other';
    if (!grouped[league]) grouped[league] = [];
    grouped[league].push(match);
  });
  return grouped;
};

export default function HomeScreen() {
  const [fixtures, setFixtures] = useState([]);
  const [logos, setLogos] = useState({});
  const today = '2025-04-16';

  useEffect(() => {
    getFixturesByDate(today).then(setFixtures);
  }, []);

  useEffect(() => {
    const loadLogos = async () => {
      const newLogos = {};
      for (const match of fixtures) {
        if (!newLogos[match.strHomeTeam]) {
          newLogos[match.strHomeTeam] = await getTeamLogo(match.strHomeTeam);
        }
        if (!newLogos[match.strAwayTeam]) {
          newLogos[match.strAwayTeam] = await getTeamLogo(match.strAwayTeam);
        }
      }
      setLogos(newLogos);
    };

    if (fixtures.length > 0) {
      loadLogos();
    }
  }, [fixtures]);

  const groupedFixtures = groupByLeague(fixtures);

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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Fixtures</Text>

        {fixtures.length === 0 ? (
          <Text style={styles.noData}>No matches found.</Text>
        ) : (
          <>
            {Object.entries(groupedFixtures).map(([league, matches]) => (
              <View key={league} style={styles.section}>
                <Text style={styles.sectionTitle}>{league}</Text>

                {matches.map((match) => (
                  <MatchCard
                    key={match.idEvent}
                    match={match}
                    homeLogo={logos[match.strHomeTeam]}
                    awayLogo={logos[match.strAwayTeam]}
                  />
                ))}
              </View>
            ))}
          </>
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
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  teamRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 4,
},
teamName: {
  fontSize: 14,
  fontWeight: '600',
},
teamLogo: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},
vs: {
  fontSize: 14,
  marginHorizontal: 6,
  fontWeight: 'bold',
},

});
