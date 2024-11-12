import React from 'react';
function StreakStats({streakCurrent, streakLongest, streakBreaker}) {

  // Return the table row
  return (
    <>
      <tr>
       <td colspan="5" style={{ textAlign: 'left' }} >Hitting Streak {streakCurrent}</td>
        
        <td colspan="5">Career Long {streakLongest}</td>
        
        
      </tr>

      <tr>
        
        <td colspan="10" style={{ textAlign: 'left' }}> Broken By: {streakBreaker} </td>
        
      </tr>

    </>
  );
}

export default StreakStats;
