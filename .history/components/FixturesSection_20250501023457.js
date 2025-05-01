import React from 'react';
import { View, Text } from 'react-native';
import MatchCard from './MatchCard';
import styles from '../styles/HomeScreenStyles';

export default function FixturesSection({ groupedFixtures, onFollowTeam, followedTeams }) {
  if (!groupedFixtures || Object.keys(groupedFixtures).length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Fixtures</Text>
        <Text style={styles.noData}>No matches found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Live Fixtures</Text>
      {Object.entries(groupedFixtures).map(([league, matches]) => (
        <View key={league} style={styles.section}>
          <Text style={styles.sectionTitle}>{league}</Text>
          {matches.map((match) => (
            <MatchCard
              key={match.fixture?.id}
              match={match}
              onFollowTeam={onFollowTeam}
              followedTeams={followedTeams}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
