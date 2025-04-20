const API_KEY = '3'; // Free user default
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

export const getFixturesByDate = async (date) => {
  try {
    const res = await fetch(`${BASE_URL}/eventsday.php?d=${date}&s=Soccer`);
    const data = await res.json();
    return data.events || []; // some days return null
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
};
