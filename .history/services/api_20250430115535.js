export async function getTopScorers({ league, season }) {
    const res = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${league}&season=${season}`,
      {
        headers: {
          'x-rapidapi-key': 'YOUR_API_KEY',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const json = await res.json();
    return json.response;
  }
  