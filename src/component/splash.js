import React from 'react';

const QRCodeDiv = () => {
  return (
    <div>
      <img src={require("../data/QRStarting9.png")} alt="https://starting9.vercel.app/"  /> 
    </div>
  );

};

function clearSeries() {
  localStorage.removeItem("SeriesData")
}

function handleClearClick() {
  if (
    window.confirm(
      "Press OK to Clear Your Starting 9 Cache.\n \n THIS WILL REMOVE ALL STATS FROM YOUR PREVIOUS GAMES. \n \n Press Cancel to return to the Splash Screen. "
    )
  ) {
    localStorage.removeItem("HomeRuns");
    localStorage.removeItem("Triples");
    localStorage.removeItem("Doubles");
    localStorage.removeItem("Singles");
    localStorage.removeItem("AtBats");
    localStorage.removeItem("RBI");
    localStorage.removeItem("GameCount");
    localStorage.removeItem("LastGame");

    localStorage.removeItem("StreakCurrent");
    localStorage.removeItem("StreakLongest");
    localStorage.removeItem("StreakBreaker");

    clearSeries();

  } else {
  }
}

function SplashDiv({ game }) {
  if (game == null || game === 0) {
    return (
      <div>
        <h3> Welcome to Starting 9! </h3>
        <p>
          {" "}
          <b> Starting 9 </b> is a the first game to test your knowledge of
          Baseball Starting Lineups.
        </p>
        <p>
          Your skills will be developed as a member of the <b> Mudville 9</b>.
          Your goal is to get a <b> HIT </b> before your oppenent records{" "}
          <b> 3 OUTS </b> (5 Pitches/Guesses). Any Hit guarantees the Mudville
          9 a hard-earned victory.
        </p>
        <p>
          {" "}
          Begin by clicking the Yellow <b>START</b> button above (or read on
          for more details).{" "}
        </p>
        <table>
          <td class="splashQuote">
            "I don't care where I bat. I just want to be in the lineup." -
            Carl Yastrzemski
          </td>
        </table>
        <p>
          {" "}
          Each Game consists of up to <b> 5 Pitches </b> in which you get the
          opportunity to <b> Pick the WINNING team </b> based on a pair of
          lineups from the &nbsp;
          <a
            href="https://sabr.org/gamesproject"
            target="_blank"
            rel="noreferrer"
          >
            SABR Baseball Games Project{" "}
          </a>{" "}
          .{" "}
        </p>
        <p>
          For each pitch you get to REVEAL a player POSITION from the lineup.
          Based upon the unveiled players take your best swing by choosing the
          team that won the mystery game. 
          (To confirm your team choice hit the SELECT button below the Team Selection Dropdown){" "}
        </p>
        <p>
          The results of the pitch will be determined by the number of guesses
          you need to figure out the Winning Squad.{" "}
        </p>
        <p>
          A Hit guarantees a Mudville Victory. However, if you tally 3 outs
          prior to getting a hit there will be No Joy in Mudville.
        </p>
        <p>After 5 Pitches you will move on to the next game. </p>
        <h2> Play Ball!!! </h2>
        <QRCodeDiv />
        <p></p>
        <b>Sources:</b> &nbsp;
        <div>
          <a
            href="https://sabr.org/gamesproject"
            target="_blank"
            rel="noreferrer"
          >
            SABR Baseball Games Project{" "}
          </a>{" "}
        </div>
        <div>
          <a href="https://retrosheet.org/" target="_blank" rel="noreferrer">
            RetroSheet{" "}
          </a>{" "}
        </div>
        <div>
          <a
            href="https://www.baseball-reference.com/"
            target="_blank"
            rel="noreferrer"
          >
            Baseball-Reference{" "}
          </a>{" "}
          {""}
        </div>
        <div>
          Additional Graphics: &nbsp;
          <a href="https://tenor.com/" target="_blank" rel="noreferrer">
            tenor.com{" "}
          </a>{" "}
        </div>
        <div>
          *** For more detailed information on Starting9, weekly game updates or to report issues/questions please click here:  &nbsp;    
          <a href="https://phungo.blogspot.com/2024/01/introducing-starting9.html" target="_blank" rel="noreferrer">
             Starting9 Documentation 
          </a>{" "} 
        </div>
        <div>
          or follow &nbsp; 
          <a href="https://twitter.com/phungo2008" target="_blank" rel="noreferrer">
             phungo2008 
          </a>{" "} on twitter ***
        </div>
        <div>
        *** If you enjoy Starting 9 please try our Wine Tasting Game{" "}
        <a
          href="https://sofa-somm.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Sofa Somm{" "}
        </a>{" "}
        ***
        </div>
        <h2 class="starting9Title ">
          {" "}
          <b>
            {" "}
            <i> Starting 9 </i>
          </b>
        </h2>
     
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <button class="resetButton" onClick={handleClearClick}>
          {" "}
          CC
        </button>
      </div>
    );
  } else {
    return null; // Return null if game is not null or 0
  }
}

export default SplashDiv;
