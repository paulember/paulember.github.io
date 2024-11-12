import React from 'react';

// Header component
function AtBatHeader({ game }) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="td-atBatHeader"> Game {game} At Bats </td>
        </tr>
      </tbody>
    </table>
  );
}

// At bat row component
function AtBatRow({ index, atBatHistoryItem }) {
  return (
    <table key={index}>
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <td className="td-atBatHistoryTeam">
            {atBatHistoryItem ? atBatHistoryItem.processTeam : ""}
          </td>
          <td className="td-atBatHistoryResult">
            {atBatHistoryItem ? ` ${atBatHistoryItem.ABResult}` : ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// At bat history component
function AtBatHistoryDiv({ game, atBatHistory }) {
  return (
    <div>
      <AtBatHeader game={game} />
      {[...Array(5)].map((_, index) => (
        <AtBatRow
          key={index}
          index={index}     
          atBatHistoryItem={atBatHistory[index]}
        />
      ))}
    </div>
  );
}

export default AtBatHistoryDiv;