import React from 'react';
import {calculatePct000} from "./utility";
function SeriesDataComponent({ SeriesData }) {

  const {
    SeriesName,
    SeriesComplete,
    SeriesHomeRuns,
    SeriesTriples,
    SeriesDoubles,
    SeriesSingles,
    SeriesAtBats,
    SeriesRBI,
    SeriesGameCount,
    SeriesLastGame
  } = SeriesData;

  const totalHits = parseInt(SeriesHomeRuns) + parseInt(SeriesTriples) + parseInt(SeriesDoubles) + parseInt(SeriesSingles);
  const totalBases = parseInt(SeriesHomeRuns) * 4 + parseInt(SeriesTriples) * 3 + parseInt(SeriesDoubles) * 2 + parseInt(SeriesSingles);
  
  const battingAVG = calculatePct000(totalHits, SeriesAtBats);
  const battingSLG = calculatePct000(totalBases, SeriesAtBats);
  const winningPct = calculatePct000(totalHits, SeriesGameCount); 

  // Return the table row
  return (
    <>
      <tr>
        <td colspan="10">Below is a Test of a New Stat Line {SeriesName} {totalHits} - {parseInt(SeriesGameCount) - parseInt(totalHits)} {winningPct}</td>
        
      </tr>

      <tr>
        <td>
          {totalHits} - {parseInt(SeriesGameCount) - parseInt(totalHits)}
        </td>
        <td>{winningPct}</td>
        <td>{SeriesAtBats}</td>
        <td>{totalHits}</td>
        <td>{SeriesDoubles}</td>
        <td>{SeriesTriples}</td>
        <td>{SeriesHomeRuns}</td>
        <td>{SeriesRBI}</td>
        <td>{battingAVG}</td>
        <td>{battingSLG}</td>
      </tr>

    </>
  );
}

export default SeriesDataComponent;
