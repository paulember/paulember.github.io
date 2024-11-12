import { useEffect, useState } from 'react';

function useFetchGames() {
  const [gamesGIT, setGamesGIT] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/games.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('useFetchGames: Network response was not ok');
        }
        return response.json();
      })
      .then(dataGamesGIT => {
        setGamesGIT(dataGamesGIT);
        console.log("useFetchGames: Fetch of GamesGIT completed at:", new Date(), " data: ", dataGamesGIT); 
      })
      .catch(error => {
        console.error('useFetchGames: Error fetching data:', error);
      });
  }, []);

  return gamesGIT;
}

export default useFetchGames;
