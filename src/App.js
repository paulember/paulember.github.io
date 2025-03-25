import "./styles.css";
import SearchableDropdown from "./searchableDropdown";
import Modal from "./Modal";
import SplashDiv from "./component/splash";
import {TastingNotesButtons, BottleHistoryTable} from "./component/modalHelpers";
import {getBaseScoreMiss, getBaseScoreHit, getBaseScoreLabel, getJulianDate} from "./component/scoring";

import useFetchWine from "./component/useFetchWine";
import {GetGroup5Pick3, GetGroup7Pick2, GetRedMajor}  from './component/getGroupPicks';
import GetDatedWineOIDs from './component/getDatedWineOIDs';
import getWineOIDfunc from './component/getWineOIDfunc';
import getRedWineKey from './component/getRedWineKey';
import buildWineTable from './component/wineTables';

import { vennCriteria } from "./data/vennCategory";
import { vennGames } from "./data/vennCategory";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

const gameTotal = 20;


export default function App() {
  const { wineData, loading, error } = useFetchWine();
  

  const [style, setStyle] = useState(null);
  const [startButtonLabel, setStartButtonLabel] = useState("Start");
  const [startMsg, setStartMsg] = useState(" <-- click 'Tasting' to start");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [dropStyle, setDropStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [game, setGame] = useState(null);
  const [LSLastGame, setLSLastGame] = useState(0);
  const [wineScore, setWineScore] = useState(99);
  const [wineScoreLabel, setWineScoreLabel] = useState(null);
  const [dusanBottle, setDusanBottle] = useState(null);
  const [dusanNotes, setDusanNotes] = useState(null);
  const [dusanLink, setDusanLink] = useState(null);

  const [LSTotalNotes, setLSTotalNotes] = useState(0);
  const [LSTotalScore, setLSTotalScore] = useState(0);
  const [LSBalthazarCount, setLSBalthazarCount] = useState(0);
  const [LSTastingCount, setLSTastingCount] = useState(0);

  const [tastingButton, setTastingButton] = useState("sofaSommStart");

  const [gameBottle, setGameBottle] = useState(0);
  const [gameSpills, setGameSpills] = useState(0);
  const [gameNotesAcquired, setGameNotesAcquired] = useState(0);

  const [vennKey, setVennKey] = useState([Array(6).fill(null)]);

  const [vennLabel, setVennLabel] = useState([Array(6).fill(null)]);
  const [vennBackIcon, setVennBackIcon] = useState([Array(6).fill(null)]);
  const [wineNotes, setWineNotes] = useState([Array(5).fill(null)]);

  const [venntdClass, setVenntdClass] = useState([Array(6).fill(null)]);
  const [winetdClass, setWinetdClass] = useState([Array(6).fill(null)]);

  const [showHideBottleDiv, setShowHideBottleDiv] = useState("Show ");
  const [divBlockNone, setDivBlockNone] = useState("divDisplayNone");

  const [bottleHistory, setBottleHistory] = useState([]);
  const [tastingFocus, setTastingFocus] = useState("Preference: None");

  const gameStartRed = 5;
  const gameStartWhite = 15;
  
  const keyDate = getJulianDate(new Date());

  const pick72 = getWineOIDfunc(keyDate, "red").toString().slice(0, 2);



  

  const pick72white = getWineOIDfunc(keyDate, "white");
  const pick72red = getWineOIDfunc(keyDate, "red");
  const pick72split = getWineOIDfunc(keyDate, "split");

  const [pick72_mystery_bottle_indice, setPick72_mystery_bottle_indice] = useState (null);

  const pick53redA =  getWineOIDfunc(keyDate, "red").toString().slice(2, 3);
  const pick53redB =  getWineOIDfunc(keyDate, "red").toString().slice(3, 4);

  const pick72redA = getWineOIDfunc(keyDate, "red").toString().slice(0, 1);
  const pick72redB = getWineOIDfunc(keyDate, "red").toString().slice(1, 2);
  const pick72whiteA = getWineOIDfunc(keyDate, "white").toString().slice(0, 1);
  const pick72whiteB = getWineOIDfunc(keyDate, "white").toString().slice(1, 2);
  const pick72splitA = getWineOIDfunc(keyDate, "split").toString().slice(0, 1);
  const pick72splitB = getWineOIDfunc(keyDate, "split").toString().slice(1, 2);


  const [redA_Key,setRedA_Key] = useState("1") ;
  const [dataRedWineTable, setDataRedWineTable] = useState(Array(7).fill(null));
  const [dataWhiteWineTable, setDataWhiteWineTable] = useState(Array(7).fill(null));
  
  const [bottleForRedNotes123, setBottleForRedNotes123] = useState(null);
  const [bottleForRedNotes456, setBottleForRedNotes456] = useState(null);
  const [bottleForWhiteNotes123, setBottleForWhiteNotes123] = useState(null);
  const [bottleForWhiteNotes456, setBottleForWhiteNotes456] = useState(null);
  const [bottleForSplitNotes123, setBottleForSplitNotes123] = useState(null);
  const [bottleForSplitNotes456, setBottleForSplitNotes456] = useState(null);

 

  useEffect(() => {

   
    
    const fetchMajorRedWineData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/redWineMajor.json"); 
        if (!response.ok) {
          throw new Error("Failed to redwine url fetch data");
        }
        const data = await response.json();
        const elements = 7;
        const filteredItems = Array.from({ length: elements }, (_, i) =>
        data[i]?.pick_1 ?? null
      ).filter((item) => item !== null);
        
        console.log("fetch good setDataRedWine Table: " + filteredItems);
        setDataRedWineTable(filteredItems)


      } catch (error) {
        console.error("Error fetching redwine url JSON:", error);
      }
    };
 
    const fetchMajorWhiteWineData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/whiteWineMajor.json"); 
        if (!response.ok) {
          throw new Error("Failed to whitewine url fetch data");
        }
        const data = await response.json();

        const filteredItems = [data[0].pick_1, data[1].pick_1,data[2].pick_1, data[3].pick_1,
                          data[4].pick_1, data[5].pick_1,data[6].pick_1];
        
        console.log("fetch good setDataWhiteWine Table: " + filteredItems);
        setDataWhiteWineTable(filteredItems)


      } catch (error) {
        console.error("Error fetching whitewine url JSON:", error);
      }
    };
 
    
    fetchMajorRedWineData();
    fetchMajorWhiteWineData();

    }, []);

  const redB_Key = getRedWineKey("2")     
    
  


  

  //  const redA_Key2 = "test";

  
  
    //const [redA_Key,setRedA_Key] = useState(getRedWineKey(5));
   // setRedA_Key(getRedWineKey(2));

  //setRedA_Key("2");
  // } getRedWineKey("2")
  
  // const redB_Key = getRedWineKey(pick72redB)
  
  // etGetRedMajor(pick72redB);





  const appendBottleHistory = (selectedStyle) => {
    setBottleHistory((bottleHistory) => [...bottleHistory, selectedStyle]);
  };

  const [selectWineDisabled, setSelectWineDisabled] = useState(true);

  function WineSelection({ winePropValue }) {
    try {
      const selectedWine =
        wineData.find((wine) => wine.style == winePropValue) || null;

      if (
        !selectedWine ||
        !selectedWine.tastingNote1 ||
        !selectedWine.tastingNote2
      ) {
        throw new Error("Invalid wine data");
      }

      return (
        <>
          <table>
            <tr>
              <td></td>
              <td class="td-wineStyle" id="tdWineStyle">
                <b> {selectedWine.style} </b>
              </td>
              <td></td>
            </tr>
          </table>
          <table>
            <tr>
              <td class={winetdClass[0]}> {selectedWine.tastingNote1} </td>
              <td class={winetdClass[1]}> {selectedWine.tastingNote2} </td>
              <td class={winetdClass[2]}> {selectedWine.tastingNote3} </td>
            </tr>
            <tr>
              <td class={winetdClass[3]}> {selectedWine.tastingNote4} </td>
              <td class="td-wineMiss"> </td>
              <td class={winetdClass[4]}> {selectedWine.tastingNote4} </td>
            </tr>
          </table>
        </>
      );
    } catch (error) {
      console.error("An error occurred:", error);
      return "No Wine Selected"; // Return an empty string in case of an error
    }
  }

  function BuildSelectionRow(val) {
    if (game != null) {
      setSelectWineDisabled(false);
    }
    setSelectedStyle(null);
    setDropStyle(val);
  }

  function getVennGame() {
    //let newRet = vennGames.find((vennSet) => vennSet.id === game) || null;
    //console.log ("newRet: " + newRet.venn_A)
    return vennGames.find((vennSet) => vennSet.id == game) || null;
  }

  function handleClickGameRed (){
      setTastingFocus("Preference: Red Wine");

      localStorage.setItem("LastGame", gameStartRed);
      handleClickNext();
  }

  function handleClickGameWhite (){
    setTastingFocus("Preference: White Wine");

    localStorage.setItem("LastGame", gameStartWhite);
    handleClickNext();
  }

  function handleClickNext() {
    setLSLastGame(localStorage.getItem("LastGame"));
    setGame(localStorage.getItem("LastGame"));

    if (game % 10 === 0 & game > 0) {
      setGame((prevGame) => (prevGame % gameTotal) + 1);
      setTastingFocus("Prefererence: None");
      window.location.href = window.location.href;
    }

    setGame((prevGame) => (prevGame % gameTotal) + 1);

    setLSTastingCount(localStorage.getItem("TastingCount"));
    setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
    setLSTotalScore(localStorage.getItem("TotalScore"));
    setLSTotalNotes(localStorage.getItem("TotalNotes"));
  }

  function handleClickHelp() {
    window.location.href = window.location.href;
  }

  useEffect(() => {
    if (game !== null) {
      if (game > 0) {
        setStartMsg("");
        setStartButtonLabel("TastingNEW: ");
      }

      let newVennKey = [
        [getVennGame(game).venn_0],
        [getVennGame(game).venn_1],
        [getVennGame(game).venn_2],
        [getVennGame(game).venn_3],
        [getVennGame(game).venn_4],
        [getVennGame(game).venn_5]
      ];
      setVennKey(newVennKey);

      const tempArray = [];
      for (let i = 0; i < 6; i++) {
        tempArray[i] = "td-vennMiss";
      }

      setVenntdClass([
        tempArray[0],
        tempArray[1],
        tempArray[2],
        tempArray[3],
        tempArray[4],
        tempArray[5]
      ]);

      setSelectWineDisabled(true);
      setSelectedStyle("Select a Wine Style...");
      setDropStyle("Select a Bottle of Wine...");
      setWineScore(99);
      setGameBottle(0);
      setGameSpills(0);

      setLSTotalNotes(localStorage.getItem("TotalNotes"));
      setLSTotalScore(localStorage.getItem("TotalScore"));
      setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
      setLSTastingCount(localStorage.getItem("TastingCount"));

      if (LSTotalNotes == null) {
        localStorage.setItem("TotalNotes", 0);
        setLSTotalNotes(localStorage.getItem("TotalNotes"));
      }
      if (LSTotalScore == null) {
        localStorage.setItem("TotalScore", 0);
        setLSTotalScore(localStorage.getItem("TotalScore"));
      }
      if (LSBalthazarCount == null) {
        localStorage.setItem("BalthazarCount", 0);
        setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
      }
      if (LSTastingCount == null) {
        localStorage.setItem("TastingCount", 0);
        setLSTastingCount(0);
      }

      setBottleForRedNotes123(wineData[pick72redA].style);
      setBottleForRedNotes456(wineData[pick72redB].style)
      setBottleForWhiteNotes123(wineData[pick72whiteA].style);
      setBottleForWhiteNotes456(wineData[pick72whiteB].style)
      setBottleForSplitNotes123(wineData[pick72splitA].style);
      setBottleForSplitNotes456(wineData[pick72splitB].style)

      setPick72_mystery_bottle_indice(13);

 


      setDusanBottle(null);
      setBottleHistory([]);
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
      setTastingButton("sofaSommTitle");
    }
  }, [game]);

useEffect(() => {



}, [dataRedWineTable]);


  useEffect(() => {
    for (let i = 0; i <= 2; i++) {
      if (vennKey[i] === undefined) {
        vennKey[i] = null;
      }
    }
    if (vennKey[0] !== null && vennKey[1] !== null && vennKey[2] !== null) {
      
      const criteria = new Array(6).fill(null);
      const labels = new Array(6).fill(null);
      const los = new Array(6).fill(null);
      const his = new Array(6).fill(null);

      const wineDataLength = wineData.length;
      const dusanArray = new Array(wineDataLength).fill(0);

      for (let i = 0; i <= 5; i++) {
        criteria[i] =
          vennCriteria.find((vennSet) => vennSet.key == vennKey[i]) || null;

        if (!criteria[i].label) {
          labels[i] = los[i] = his[i] = criteria[i].key;
        } else {
          labels[i] = criteria[i].label;
          los[i] = criteria[i].lo;
          his[i] = criteria[i].hi;
        }

        for (let j = 0; j < wineDataLength; j++) {
          for (let k = 1; k <= 5; k++) {
              if (wineData[j][`tastingNote${k}`] === labels[i]) {
                  dusanArray[j]++;
              }
          }
        }      

        const largestIndex = dusanArray.reduce(
          (acc, cur, idx) => (cur > dusanArray[acc] ? idx : acc),
          0
        );
        
        const largestNumber = dusanArray[largestIndex];

        setDusanBottle(wineData[largestIndex].style);
        setDusanLink(
          "https://winefolly.com/grapes/" + wineData[largestIndex].style
        );


        setDusanNotes(
          `(${largestNumber}) - ${[
            wineData[largestIndex].tastingNote1,
            wineData[largestIndex].tastingNote2,
            wineData[largestIndex].tastingNote3,
            wineData[largestIndex].tastingNote4,
            wineData[largestIndex].tastingNote5,
          ].join(", ")}`
        );
      }

      setVennLabel(labels);
    }
  }, [vennKey]);

  useEffect(() => {
    if (selectedStyle !== null) {
      const selectedWine =
        wineData.find((wine) => wine.style == selectedStyle) || null;

      if (selectedWine !== null) {
        appendBottleHistory(selectedStyle);
        const tastingNotes = [
          selectedWine.tastingNote1,
          selectedWine.tastingNote2,
          selectedWine.tastingNote3,
          selectedWine.tastingNote4,
          selectedWine.tastingNote5
        ];
        setWineNotes(tastingNotes);
        setGameBottle(gameBottle + 1);
      }
    }
  }, [selectedStyle]);

  useEffect(() => {
    setWineScoreLabel(getBaseScoreLabel(wineScore))
  }, [wineScore]);

  useEffect(() => {
    ``;
  }, [wineScoreLabel]);

  const openModal = () => {
    localStorage.setItem("LastGame", game);
    if (LSTastingCount == null) {
      localStorage.setItem("TastingCount", 1);
      setLSTastingCount(1);
    } else {
      setLSTastingCount((prevCount) => parseInt(prevCount) + parseInt(1));
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    localStorage.setItem(
      "TotalNotes",
      parseInt(LSTotalNotes) + parseInt(gameNotesAcquired)
    );

    if (gameNotesAcquired > 5) {
      if (isNaN(LSBalthazarCount)) {
        localStorage.setItem("BalthazarCount", 1);
      } else {
        localStorage.setItem(
          "BalthazarCount",
          parseInt(LSBalthazarCount) + parseInt(1)
        );
      }
    }

    localStorage.setItem(
      "TotalScore",
      parseInt(LSTotalScore) + parseInt(wineScore)
    );
    localStorage.setItem("TastingCount", LSTastingCount);

    setIsModalOpen(false);
    handleClickNext();
  };

  useEffect(() => {
    if (gameBottle > 5) {
      let baseScore = getBaseScoreMiss(gameNotesAcquired);
      console.log("baseScore: " + baseScore)
      setWineScore(baseScore - gameSpills * 2);
      openModal();
    }
  }, [gameBottle]);

  useEffect(() => {
    let matchCount = 0;
    for (let i = 0; i < 6; i++) {
      if (venntdClass[i] == "td-vennMatch") {
        matchCount++;
      }
    }
    setGameNotesAcquired(matchCount);
    if (matchCount > 5) {
      let baseScore = getBaseScoreHit(gameBottle);
      setWineScore(baseScore - gameSpills * 3);
      if (gameBottle < 6) {
        openModal();
      }
    }
  }, [venntdClass]);

  useEffect(() => {
    const initialWineArray = Array(5).fill("td-wineMiss");
    const initialVennArray = Array.from(venntdClass);
  
    const matchingElements = vennLabel.filter(value => wineNotes.includes(value));
    const matchLength = matchingElements.length;
  
    if (matchLength < 1) {
      setGameSpills(gameSpills + 1);
    }
  
    matchingElements.forEach(match => {
      vennLabel.forEach((label, index) => {
        if (label === match) {
          initialVennArray[index] = "td-vennMatch";
        }
      });
      wineNotes.forEach((note, index) => {
        if (note === match) {
          initialWineArray[index] = "td-wineMatch";
        }
      });
    });
  
    setVenntdClass(initialVennArray);
    setWinetdClass(initialWineArray);
  }, [wineNotes]);
  

  function SelectButton({ value, onSelectWineClick }) {
    return (
      <button disabled={selectWineDisabled} onClick={onSelectWineClick}>
        {value}
      </button>
    );
  }

  function SplashBtnDiv() {
    if (game == null) {
      return (
        <div>
          <h3> Welcome to Sofa Sommelier! </h3>Red
         
          <p> Click &nbsp;            
            <button class="buttonContinue" onClick={handleClickNext}>
              Continue
          
            </button> to start or resume your tasting or read on for more details.  </p>
  
          If you prefer to focus on Red or White Click the appropriate button and your first FIVE tastings will be curated as chosen.   
          <p></p>
          
          <div>
          <button class="buttonWhite" onClick={handleClickGameWhite}>
              White
          </button>
         
          <button class="buttonRed" onClick={handleClickGameRed}>
              Red
          </button> 
         
          <button class="buttonContinue" onClick={handleClickNext}>
              Red & White
          </button>

          <div>
     
      
      <div>julianToday: {keyDate}</div>
      <div>72r: {pick72red}</div>
      <div>72w: {pick72white}</div>
      <div>72s: {pick72split}</div>

      <div>72rA: {pick72redA}</div>
      <div>redA_Key: {redA_Key}</div>
      <div>redB_Key: {redB_Key}</div>

      <div>bottle 123: {bottleForRedNotes123}</div>    
      <div>bottle 456: {bottleForSplitNotes456}</div>
      

      <div>redArray_Key: {dataRedWineTable[0]}</div>    
      <div>redArray_Key: {dataRedWineTable[1]}</div>
      <div>redArray_Key: {dataRedWineTable[2]}</div>
      <div>redArray_Key: {dataRedWineTable[3]}</div>
      <div>redArray_Key: {dataRedWineTable[4]}</div>
      <div>redArray_Key: {dataRedWineTable[5]}</div>
      <div>redArray_Key: {dataRedWineTable[6]}</div>
      <div>redArray_Key: {dataRedWineTable[7]}</div>
      
      <div>whiteArray_Key: {dataWhiteWineTable[0]}</div>    
      <div>whiteArray_Key: {dataWhiteWineTable[1]}</div>
      <div>whiteArray_Key: {dataWhiteWineTable[2]}</div>
      <div>redArray_Key: {dataWhiteWineTable[3]}</div>
      <div>redArray_Key: {dataWhiteWineTable[4]}</div>
      <div>redArray_Key: {dataWhiteWineTable[5]}</div>
      <div>redArray_Key: {dataWhiteWineTable[6]}</div>
      <div>redArray_Key: {dataWhiteWineTable[7]}</div>
    
      <div>72rB: {pick72redB}</div>
      <div>53rA: {pick53redA}</div>
      <div>53rB: {pick53redB}</div>

      <div> TestTest3_53  <GetGroup5Pick3 oid={pick53redA} />  and  <GetGroup5Pick3 oid={pick53redB} />TestEnd3   </div>
      
     
      

      TestSPlashEnd1
      </div>

          </div>
          <SplashDiv game={game} />
        </div>
      );
    }
  }

  function handleWineSelection({ dropStyle }) {
    setSelectedStyle(dropStyle);
  }

  function toggleBottleDiv() {
    setShowHideBottleDiv(divBlockNone !== "divDisplayNone" ? "Show" : "Hide");
    setDivBlockNone(divBlockNone !== "divDisplayNone" ? "divDisplayNone" : "divDisplayBlock");
  }
  
  return (
    <div class="h1-background-bottle-glass">
      <div>
        <p>
          <h2 class="sofaSommTitle ">
            {" "}
            <b>
              {" "}
              <i> Sofa Somm </i>   
              &emsp;&emsp;
            </b>
            <button class={tastingButton} onClick={handleClickNext}>
              {" "}
              {startButtonLabel} {game}
            </button>
            &emsp;
            <button class="sofaSommHelp" onClick={handleClickHelp}>
              about
            </button>
          </h2>
        </p>
      </div>
      <div>
        <SplashBtnDiv />
      </div>

      <div>
        <b> Find Wines that Match these Tasting Notes </b>
      </div>[wineNotes]
  <div>


<div>  TestTest1_array  {dataRedWineTable} TestEnd1</div>
   
 


      </div>
      <div> pick72 {pick72} </div>
      <div> pick72redA {pick72redA} </div>
      <div> pick72redB {pick72redB} </div>


   
      
      ################### 
      <div> pick72white {pick72white} </div>
      <div> pick72whiteA {pick72whiteA} </div>
      <div> pick72whiteB {pick72whiteB} </div>
      <div> getMysteryNotesFromDates123white {bottleForWhiteNotes123} </div> 
      <div> getMysteryNotesFromDates456white {bottleForWhiteNotes456} </div>
      ####################
      <div> pick72red {pick72red} </div>
      <div> getMysteryNotesFromDates123red {bottleForRedNotes123} </div> 
      <div> getMysteryNotesFromDates456red {bottleForRedNotes456} </div>

      <div> pick72split {pick72split} </div>
      <div> getMysteryNotesFromDates123split {bottleForSplitNotes123} </div> 
      <div> getMysteryNotesFromDates456split {bottleForSplitNotes456} </div>
      
      <div> ++++mystery bottle indice= {pick72_mystery_bottle_indice} ++++
       
      TestEnd2

      </div>
      <div>
      TestTest3_53  <GetGroup5Pick3 oid={pick53redA} />  and  <GetGroup5Pick3 oid={pick53redB} />TestEnd3
      
     
      </div>
    
      <div>
      
    
      TestEnd4

      </div>
      <div>  redOID:  <GetDatedWineOIDs oid={keyDate} oidType="red" /> TestEnd1</div>
      
     
      <div>
        <div>
          <table class="notesTable">
            <tr>
              <td class={venntdClass[0]}> {vennLabel[0]} </td>
              <td class={venntdClass[1]}> {vennLabel[1]} </td>
              <td class={venntdClass[2]}> {vennLabel[2]} </td>
            </tr>
            <tr>
              <td class={venntdClass[3]}> {vennLabel[3]} </td>
              <td class={venntdClass[4]}> {vennLabel[4]} </td>{" "}
              <td class={venntdClass[5]}> {vennLabel[5]} </td>
            </tr>
          </table>
        </div>
      </div>
      <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
      <div id="dropdownIn">
        <SearchableDropdown
          width="100"
          options={wineData}
          label="style"
          id="id"
          selectedVal={dropStyle}
          handleChange={(val) => BuildSelectionRow(val)}
        />

        <div>
          <SelectButton
            value={"Open Bottle?"}
            onSelectWineClick={() => handleWineSelection({ dropStyle })}
          />
        </div>
      </div>
      <WineSelection winePropValue={selectedStyle} />
      <div>________________________________________</div>
      <div>
        <table>
          <tr>
            {" "}
            <td class="td-bottleHistory"> Bottles Opened </td>{" "}
          </tr>
          <BottleHistoryTable bottleHistory={bottleHistory} />
        </table>
      </div>

      <div>
        <table>
          <tr>
            <td class="td-bottleHistory"> Sommelier Credentials </td>
          </tr>
        </table>
        <table class="sofaJPG">
          <tr>
            Sofa Somm Rating: {(LSTotalScore / LSTastingCount).toFixed(1)}
          </tr>
          <tr>
            Balthazars: {LSBalthazarCount} &emsp; Rate:{" "}
            {((LSBalthazarCount / LSTastingCount) * 100).toFixed(0)}%
          </tr>
          <tr>
            Notes/Tasting: {(LSTotalNotes / LSTastingCount).toFixed(1)} &nbsp;
            Total Notes: {LSTotalNotes}
          </tr>
          <tr>
            SommPoints: {LSTotalScore} &nbsp; Tastings: {LSTastingCount}
          </tr>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 class="sofaSommTitle">
          <b>
            <i> Sofa Somm </i>{" "}
          </b>{" "}
          &emsp;&emsp;
          <button class="sofaSommTitle" onClick={closeModal}>
            Next Game
          </button>
        </h2>
        <h1 class="h1-background-bubbles">CHEERS!!! </h1>
        <table class="modalTable">
          <tr>
            <td class="td-modalWineScore">
              {" "}
              <b> Wine Score </b> &nbsp;
              <b>{wineScore} </b> &emsp; {wineScoreLabel}
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td class="td-modalStats">Bottles Opened: {gameBottle}</td>

            <td class="td-modalStats">Glasses Spilled: {gameSpills} </td>
          </tr>
        </table>
        <p></p>
        <div>
          <table>
          <div>
            <TastingNotesButtons
              game={game}
              gameNotesAcquired={gameNotesAcquired}
              venntdClass={venntdClass}
              vennLabel={vennLabel}
              wineData={wineData}
            />
          </div>
          </table>
        </div>
        <div>
          <button onClick={() => toggleBottleDiv()}>
            {showHideBottleDiv} Bottle Details
          </button>
        </div>
        <div class={divBlockNone}>
          <table>
            <tr>
              <td class="td-bottleHistory">
                {" "}
                Magnum Bottle:{" "}
                <a href={dusanLink} target="_blank" rel="noreferrer">
                  {dusanBottle}{" "}
                </a>{" "}
                {dusanNotes}{" "}
              </td>
            </tr>
            <BottleHistoryTable bottleHistory={bottleHistory} />
          </table>
        </div>
        <p></p>
        <div>
          *** If you enjoy SofaSomm please try our Baseball Game{" "}
          <a
            href="https://starting9.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Starting9{" "}
          </a>{" "}
          ***
        </div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>.<p></p>.<p></p>.
      </Modal>
      <Analytics />
    </div>
  );
}
