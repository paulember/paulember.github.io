
import { dataGames } from "../data/games";
function getVennGame(game) {
  return dataGames.find((vennSet) => vennSet.id == game) || null;
}

export { getVennGame };
