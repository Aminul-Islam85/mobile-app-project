const API_KEY = '334de476bb8361daf2460f6090b6457f';
const BASE_URL = 'https://v3.football.api-sports.io';

export const getFixturesByDate = async (date) => {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    const data = await res.json();
    return data.response || []; 
  } catch (error) {
    console.error('Error fetching fixtures from API-Football:', error);
    return [];
  }
};

