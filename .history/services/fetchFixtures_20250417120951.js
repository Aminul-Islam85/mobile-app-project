const API_KEY = '334de476bb8361daf2460f6090b6457f'; 
const BASE_URL = 'https://v3.football.api-sports.io';

export const getFixturesByDate = async (date) => {
  try {
    const res = await fetch(`${BASE_URL}/eventsday.php?d=${date}&s=Soccer`);
    const data = await res.json();
    return data.events || []; 
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
};
