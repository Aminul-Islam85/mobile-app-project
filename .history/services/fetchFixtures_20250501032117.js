import { API_KEY, BASE_URL } from '@env';

export const getFixturesByDate = async (date) => {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?date=${date}&timezone=Europe/Helsinki`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
};
