import { useEffect, useState } from 'react';

function useFetchTeams() {
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/teams.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(dataTeams => {
        setTeamNames(dataTeams.map((team) => team.team));
        console.log("Fetch of Team Names completed at:", new Date()); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return teamNames;
}

export default useFetchTeams;
