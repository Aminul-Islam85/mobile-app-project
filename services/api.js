import { API_KEY, BASE_URL } from '@env';

export async function getTopScorers({ league, season }) {
  try {
    const res = await fetch(`${BASE_URL}/players/topscorers?league=${league}&season=${season}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    return [];
  }
}

export async function getStandings({ league, season }) {
  try {
    const res = await fetch(`${BASE_URL}/standings?league=${league}&season=${season}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}
