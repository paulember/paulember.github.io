import React from 'react';
import {getVennGame, getVennGameFromGIT} from "./dataGames";
import { dataGames } from '../data/games';

function getLocalStorageItem(key) {
  let value = localStorage.getItem(key);

  if (value === null) {
    localStorage.setItem(key, 0);
    value = 0;
  }

  return value;
}

function parseAdd(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function calculatePct000(top,bottom ) {    
  if (bottom === 0) {
    return parseInt(bottom).toFixed(3).replace(/^0+/, '');
  }
  return (parseInt(top) / parseInt(bottom)).toFixed(3).replace(/^0+/, "")
}

const dataPos = [
  " ",
  "P",
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "DH"
];

function getOutType() {
  let rando = randomNum(1, 99);
  switch (true) {
    case rando > 60:
      return "Ground Out";
    case rando > 20:
      return "Fly Out";
    case rando > 5:
      return "Pop Out";
    default:
      return "Foul Out";
  }
}




const updateClass = (classArray, prefix, processPosition, game, dataGames_24) => {
  
  if (!dataGames_24 || typeof dataGames_24 !== 'object') {
    console.error("dataGames_24 is missing or not valid.");
    return classArray; // Or handle this case as needed (e.g., return an empty array or throw an error)
  }



  return classArray.map((classItem, index) => {
    if (classItem === "td-posNewSelected") {
      return "td-posSelected";
    } else {
      const vennGame = getVennGameFromGIT(game, dataGames_24);

      if (!vennGame) {
        console.warn("Venn game data is missing for the specified game and dataGames_24.");
        return classItem; // Handle this case as needed (e.g., return the classItem unchanged)
      }

      
      const vennGamePosition = getVennGameFromGIT(game, dataGames_24)[`${prefix}${index + 1}_Pos`];
      const vennGamePositionUp = vennGamePosition ? vennGamePosition.toUpperCase() : '';

      if (processPosition === vennGamePositionUp) {
              return "td-posNewSelected";
            } else {
              return classItem;
            }
      // You may need additional checks on vennGamePosition here if it could be undefined or invalid


      //return vennGamePosition ? `td-${vennGamePosition}` : classItem;
    }
  });
};

//
      // return classArray.map((classItem, index) => {
      //   if (classItem === "td-posNewSelected") {
      //     return "td-posSelected";
      //   } else {
      //     const vennGamePosition = getVennGameFromGIT(game, dataGames_24)[`${prefix}${index + 1}_Pos`];
      //     const vennGamePositionUp = vennGamePosition ? vennGamePosition.toUpperCase() : '';
          
      //     if (processPosition === vennGamePositionUp) {
      //       return "td-posNewSelected";
      //     } else {
      //       return classItem;
      //     }
      //   }
      // });



// };







const getMostRecentMonday = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysSinceMonday = (currentDayOfWeek + 6) % 7; 
  const mostRecentMonday = new Date(today);
  mostRecentMonday.setDate(today.getDate() - daysSinceMonday); 

  if (mostRecentMonday > today) {
    mostRecentMonday.setDate(mostRecentMonday.getDate() - 7); 
  }

  const year = mostRecentMonday.getFullYear();
  const month = String(mostRecentMonday.getMonth() + 1).padStart(2, '0');
  const day = String(mostRecentMonday.getDate()).padStart(2, '0'); 
  
  return `${year}-${month}-${day}`;
}

export {getLocalStorageItem, parseAdd, randomNum, calculatePct000 ,dataPos, getOutType, updateClass, getMostRecentMonday};
