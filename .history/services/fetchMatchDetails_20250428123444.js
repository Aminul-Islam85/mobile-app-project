const API_KEY = '334de476bb8361daf2460f6090b6457f';
const BASE_URL = 'https://v3.football.api-sports.io';

export const getMatchDetails = async (fixtureId) => {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?id=${fixtureId}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    const data = await res.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
};
