const API_KEY = '3';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

export const getTeamLogo = async (teamName) => {
  try {
    const res = await fetch(`${BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`);
    const data = await res.json();
    return data.teams?.[0]?.strTeamBadge || null;
  } catch (error) {
    console.error('Error fetching logo:', error);
    return null;
  }
};
