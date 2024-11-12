import { dataGames } from "../data/games";

function getVennGame(game) {  
  return dataGames.find((vennSet) => vennSet.id == game) || null;
}




function getVennGameFromGIT(game, dataGames_24) {  
  if (!Array.isArray(dataGames_24)) {
    console.error('getVennGameFromGIT error: dataGames_24 is not an array or is undefined', dataGames_24);
    return null;
  }
  
  const result = dataGames_24.find((vennSet) => vennSet.id == game) || null;
  if (!result) {
    console.warn(`getVennGameFromGIT warning: Game with id ${game} not found.`);
  }

  return result;
}




export { getVennGame, getVennGameFromGIT};