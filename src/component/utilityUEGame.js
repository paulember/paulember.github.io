import React from 'react';
import {getVennGame} from "./dataGames";
import {getMostRecentMonday} from "./utility";

const fetchTeamData = async (teamName) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/games.json');
                                  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const teamsData = await response.json();  
    const team = teamsData.find(searchData => searchData.team === teamName);
    return team || {}; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

async function getTeamData (game, teamType) {
  let teamData;
  if (teamType == 'AWAY') {
    teamData = await fetchTeamData(getVennGame(game).AwayTeam);
  } else {
    teamData = await fetchTeamData(getVennGame(game).HomeTeam);
  }
  return (teamData)
  console.log("UE Game A: ", teamData);
};

export {getTeamData};
