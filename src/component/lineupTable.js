import React from 'react';
import { useState, useEffect } from "react";
import {getVennGame, getVennGameFromGIT} from "./dataGames";

// TableHeader component for rendering the table header
function TableHeader({ lineupHeaderAway, lineupHeaderHome, lineupColorAway, lineupColorHome }) {
  const column1Style = {
    backgroundColor: lineupColorAway,
     width: `85px`  
  };
  const column2Style = {
    backgroundColor: lineupColorAway,
    width: `15px`
  };
  const column3Style = {
    width: `15px`
  };
  const column4Style = {
    backgroundColor: lineupColorHome,
    width: `85px`
  };
  const column5Style = {
    backgroundColor: lineupColorHome,
    width: "15px"
  };
  return (
    <thead>
      <tr>
        <th style={{ ...column1Style, border: "1px solid #ddd" }}>{lineupHeaderAway}</th>
        <th style={{ ...column2Style, border: "1px solid #ddd" }}>pos</th>
        <th style={{ ...column3Style }}></th>
        <th style={{ ...column4Style, border: "1px solid #ddd" }}>{lineupHeaderHome}</th>
        <th style={{ ...column5Style, border: "1px solid #ddd" }}>pos</th>
      </tr>
    </thead>
  );
}

// TableBody component for rendering the table body
function TableBody({ data1, awaytdClass, hometdClass }) {
  return (
    <tbody>
      {data1.map((row, index) => (
        <tr key={index}>
          <td
            className={awaytdClass[index]}
            style={{ border: "1px solid #ddd" }}
          >
            {row.column1}
          </td>
          <td
            className={awaytdClass[index]}
            style={{ border: "1px solid #ddd" }}
          >
            {row.column2}
          </td>
          {index <= 8 ? <td>{index + 1}</td> : "*"}
          <td
            className={hometdClass[index]}
            style={{ border: "1px solid #ddd" }}
          >
            {row.column4}
          </td>
          <td
            className={hometdClass[index]}
            style={{ border: "1px solid #ddd" }}
          >
            {row.column5}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function LineupTable({ game, dataGames_24,lineupHeaderAway, lineupHeaderHome, awaytdClass, hometdClass, lineupColorAway, lineupColorHome }) {
  const [awayNames, setAwayNames] = useState(Array.from({ length: 10 }, () => null));
  const [homeNames, setHomeNames] = useState(Array.from({ length: 10 }, () => null));
  const [awayPos, setAwayPos] = useState(Array.from({ length: 10 }, () => null));
  const [homePos, setHomePos] = useState(Array.from({ length: 10 }, () => null));

  useEffect(() => {
    if (game) {
      setAwayNames(Array.from({ length: 10 }, (_, index) => getVennGameFromGIT(game, dataGames_24)[`A${index + 1}_Name`]));
      setHomeNames(Array.from({ length: 10 }, (_, index) => getVennGameFromGIT(game, dataGames_24)[`H${index + 1}_Name`]));
      setAwayPos(Array.from({ length: 10 }, (_, index) => getVennGameFromGIT(game, dataGames_24)[`A${index + 1}_Pos`].toUpperCase()));
      setHomePos(Array.from({ length: 10 }, (_, index) => getVennGameFromGIT(game, dataGames_24)[`H${index + 1}_Pos`].toUpperCase()));
    }
  }, [game]);

  const data1 = Array.from({ length: 10 }, (_, index) => ({
    column1: awayNames[index],  column2: awayPos[index],  column4: homeNames[index],  column5: homePos[index]
  }));

  if (game != null && game !== 0) {
    return (
      <div>
        <table>
          <TableHeader
            lineupHeaderAway={lineupHeaderAway} lineupHeaderHome={lineupHeaderHome}
            lineupColorAway={lineupColorAway} lineupColorHome={lineupColorHome}
          />
          <TableBody data1={data1} awaytdClass={awaytdClass} hometdClass={hometdClass} />
        </table>
      </div>
    );
  } else {
    return null; // Return null if game is null or 0
  }
}

export default LineupTable;
