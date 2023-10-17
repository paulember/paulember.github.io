import "./styles.css";
import SearchableDropdown from "./searchableDropdown";
import Modal from "./Modal";
import { wineData } from "./data/wineData";
import { vennCriteria } from "./data/vennCategory";
import { vennGames } from "./data/vennCategory";
import { useState, useEffect } from "react";

const gameTotal = 21;

export default function App() {
  const [style, setStyle] = useState(null);
  const [startButtonLabel, setStartButtonLabel] = useState("Start");
  const [startMsg, setStartMsg] = useState(" <-- click 'Tasting' to start");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [dropStyle, setDropStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [game, setGame] = useState(null);
  const [wineScore, setWineScore] = useState(99);
  const [WineScoreLabel, setWineScoreLabel] = useState(null);
  const [dusanBottle, setDusanBottle] = useState(null);

  const [gameBottle, setGameBottle] = useState(0);
  const [gameSpills, setGameSpills] = useState(0);
  const [gameNotesAcquired, setGameNotesAcquired] = useState(0);

  const [vennKey, setVennKey] = useState([Array(6).fill(null)]);

  const [vennLabel, setVennLabel] = useState([Array(6).fill(null)]);
  const [wineNotes, setWineNotes] = useState([Array(5).fill(null)]);

  const [venntdClass, setVenntdClass] = useState([Array(6).fill(null)]);
  const [winetdClass, setWinetdClass] = useState([Array(6).fill(null)]);

  const [showHideBottleDiv, setShowHideBottleDiv] = useState("Show ");
  const [divBlockNone, setDivBlockNone] = useState("divDisplayNone");

  const [bottleHistory, setBottleHistory] = useState([]);

  const appendBottleHistory = (selectedStyle) => {
    setBottleHistory((bottleHistory) => [...bottleHistory, selectedStyle]);
  };

  const [selectWineDisabled, setSelectWineDisabled] = useState(true);
  let nextId = 0;

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
              <td class={winetdClass[4]}> {selectedWine.tastingNote5} </td>
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
    setSelectWineDisabled(false);
    setSelectedStyle(null);
    setDropStyle(val);
  }

  function getVennGame() {
    //let newRet = vennGames.find((vennSet) => vennSet.id === game) || null;
    //console.log ("newRet: " + newRet.venn_A)
    return vennGames.find((vennSet) => vennSet.id == game) || null;
  }

  function handleClick() {
    setGame((prevGame) => (prevGame % gameTotal) + 1);
  }

  function handleClickTastingNote(i) {
    const matchingWines = wineData.filter(
      (wine) =>
        wine.tastingNote1 === vennLabel[i] ||
        wine.tastingNote2 === vennLabel[i] ||
        wine.tastingNote3 === vennLabel[i] ||
        wine.tastingNote4 === vennLabel[i] ||
        wine.tastingNote5 === vennLabel[i]
    );

    const matchingWinesLength = matchingWines.length;
    let wineMatchList =
      "\nWine Styles Known for " + vennLabel[i] + " Tasting Notes: \n \n";

    for (let j = 0; j < matchingWinesLength; j++) {
      wineMatchList = wineMatchList + matchingWines[j].style;
      wineMatchList = wineMatchList + "\n";
    }
    alert(wineMatchList);

    console.log("mw2 1 ");

    console.log(wineMatchList);
    console.log("label ");
    console.log(vennLabel[i]);
  }

  useEffect(() => {
    if (game !== null) {
      if (game > 0) {
        setStartMsg("");
        setStartButtonLabel("Tasting: ");
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
      setDusanBottle(null);
      setBottleHistory([]);
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
    }
  }, [game]);

  useEffect(() => {
    if (vennKey[0] === undefined) {
      vennKey[0] = null;
    }
    if (vennKey[1] === undefined) {
      vennKey[1] = null;
    }
    if (vennKey[2] === undefined) {
      vennKey[2] = null;
    }
    if (vennKey[0] !== null && vennKey[1] !== null && vennKey[2] !== null) {
      // Initialize vennCriteria as an empty array

      const criteria = [];
      const labels = [];
      const los = [];
      const his = [];

      const wineDataLength = wineData.length;
      const dusanArray = new Array(wineDataLength).fill(0);

      for (let i = 0; i <= 5; i++) {
        criteria[i] =
          vennCriteria.find((vennSet) => vennSet.key == vennKey[i]) || null;

        if ((criteria[i].label == null) | (criteria[i].label == undefined)) {
          labels[i] = criteria[i].key;
          los[i] = criteria[i].key;
          his[i] = criteria[i].key;
        } else {
          labels[i] = criteria[i].label;
          los[i] = criteria[i].lo;
          his[i] = criteria[i].hi;
        }

        for (let j = 0; j < wineDataLength; j++) {
          if (wineData[j].tastingNote1 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote2 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote3 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote4 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote5 == labels[i]) {
            dusanArray[j]++;
          }
        }

        let largestNumber = dusanArray[0];
        let largestIndex = 0;
        for (let k = 1; k < dusanArray.length; k++) {
          if (dusanArray[k] > largestNumber) {
            largestNumber = dusanArray[k];
            largestIndex = k;
          }
        }

        setDusanBottle(
          wineData[largestIndex].style +
            "(" +
            largestNumber +
            ") - " +
            wineData[largestIndex].tastingNote1 +
            ", " +
            wineData[largestIndex].tastingNote2 +
            ", " +
            wineData[largestIndex].tastingNote3 +
            ", " +
            wineData[largestIndex].tastingNote4 +
            ", " +
            wineData[largestIndex].tastingNote5
        );
      }

      setVennLabel([
        labels[0],
        labels[1],
        labels[2],
        labels[3],
        labels[4],
        labels[5]
      ]);
    }
  }, [vennKey]);

  useEffect(() => {
    if (selectedStyle !== null) {
      const selectedWine =
        wineData.find((wine) => wine.style == selectedStyle) || null;

      if (selectedWine !== null) {
        const tastingNotes = [];

        appendBottleHistory(selectedStyle);
        tastingNotes[0] = selectedWine.tastingNote1;
        tastingNotes[1] = selectedWine.tastingNote2;
        tastingNotes[2] = selectedWine.tastingNote3;
        tastingNotes[3] = selectedWine.tastingNote4;
        tastingNotes[4] = selectedWine.tastingNote5;

        setWineNotes([
          tastingNotes[0],
          tastingNotes[1],
          tastingNotes[2],
          tastingNotes[3],
          tastingNotes[4]
        ]);
        setGameBottle(gameBottle + 1);
      }
    }
  }, [selectedStyle]);

  useEffect(() => {
    switch (true) {
      case wineScore > 94:
        setWineScoreLabel("Exceptional");
        break;
      case wineScore > 89:
        setWineScoreLabel("Superior");
        break;
      case wineScore > 84:
        setWineScoreLabel("Very Good");
        break;
      case wineScore > 79:
        setWineScoreLabel("Good");
        break;
      case wineScore > 74:
        setWineScoreLabel("Above Average");
        break;
      case wineScore > 69:
        setWineScoreLabel("Meh");
        break;
      case wineScore > 64:
        setWineScoreLabel("flawed");
        break;
      case wineScore > 59:
        setWineScoreLabel("...drinkable");
        break;
      default:
        setWineScoreLabel("Are you a Bot?");
    }
  }, [wineScore]);

  const openModal = () => {
    const notesGood = venntdClass.filter((value) => value === "td-vennMatch")
      .length;
    setGameNotesAcquired(notesGood);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleClick();
  };

  useEffect(() => {
    if (gameBottle > 5) {
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
    if (matchCount > 5) {
      setWineScore(Math.round((wineScore + 99) / 2));
      openModal();
    }
  }, [venntdClass]);

  useEffect(() => {
    setWineScore(wineScore - 2);
  }, [gameSpills]);

  useEffect(() => {
    const temptdWineArray = [];
    for (let i = 0; i < 5; i++) {
      temptdWineArray[i] = "td-wineMiss";
    }
    setWinetdClass([
      temptdWineArray[0],
      temptdWineArray[1],
      temptdWineArray[2],
      temptdWineArray[3],
      temptdWineArray[4],
      temptdWineArray[5]
    ]);
    const matchingElements = vennLabel.filter((value) =>
      wineNotes.includes(value)
    );

    let matchLength = matchingElements.length;

    console.log("wineScore In: " + wineScore);
    console.log("wineScore matches: " + matchLength);

    const tempArray = Array.from(venntdClass);

    if (matchLength < 1) {
      setGameSpills(gameSpills + 1);
    }

    setWineScore(wineScore - (6 - matchLength));

    for (let i = 0; i < matchLength; i++) {
      for (let j = 0; j < 6; j++) {
        if (vennLabel[j] == matchingElements[i]) {
          tempArray[j] = "td-vennMatch";
        }
      }
      for (let k = 0; k < 5; k++) {
        if (wineNotes[k] == matchingElements[i]) {
          temptdWineArray[k] = "td-wineMatch";
        }
      }
    }

    setVenntdClass([
      tempArray[0],
      tempArray[1],
      tempArray[2],
      tempArray[3],
      tempArray[4],
      tempArray[5]
    ]);

    setWinetdClass([
      temptdWineArray[0],
      temptdWineArray[1],
      temptdWineArray[2],
      temptdWineArray[3],
      temptdWineArray[4]
    ]);
  }, [wineNotes]);

  function SelectButton({ value, onSelectWineClick }) {
    return (
      <button disabled={selectWineDisabled} onClick={onSelectWineClick}>
        {value}
      </button>
    );
  }

  function handleWineSelection({ dropStyle }) {
    setSelectedStyle(dropStyle);
  }

  function toggleBottleDiv() {
    if (divBlockNone != "divDisplayNone") {
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
      console.log("toggle display none: " + divBlockNone);
    } else {
      setShowHideBottleDiv("Hide ");
      setDivBlockNone("divDisplayBlock");
    }
  }

  return (
    <div>
      <div>
        <p>
          <h2 class="sofaSommTitle">
            {" "}
            <b>
              {" "}
              <i> Sofa Somm </i>
              &emsp;&emsp;
            </b>
            <button class="sofaSommTitle" onClick={handleClick}>
              {" "}
              {startButtonLabel} {game}
            </button>
          </h2>
        </p>
      </div>

      <div>
        <b> Find these Tasting Notes </b>
      </div>
      <div>
        <div>
          <table>
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
          <tr class>
            {" "}
            <td class="td-bottleHistory"> Bottles Opened </td>{" "}
          </tr>

          <tr class="td-bottleHistory"> Bottle 1: {bottleHistory[0]} </tr>
          <tr class="td-bottleHistory"> Bottle 2: {bottleHistory[1]} </tr>
          <tr class="td-bottleHistory"> Bottle 3: {bottleHistory[2]} </tr>
          <tr class="td-bottleHistory"> Bottle 4: {bottleHistory[3]} </tr>
          <tr class="td-bottleHistory"> Bottle 5: {bottleHistory[4]} </tr>
          <tr class="td-bottleHistory"> Bottle 6: {bottleHistory[5]} </tr>
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
              <b>{wineScore} </b> &emsp; {WineScoreLabel}
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
              Tasting #{game} - Notes Found: {gameNotesAcquired}
              <div class="button_container">
                <button
                  class={venntdClass[0]}
                  onClick={() => handleClickTastingNote(0)}
                >
                  {" "}
                  {vennLabel[0]}
                </button>
                <button
                  class={venntdClass[1]}
                  onClick={() => handleClickTastingNote(1)}
                >
                  {" "}
                  {vennLabel[1]}
                </button>
                <button
                  class={venntdClass[2]}
                  onClick={() => handleClickTastingNote(2)}
                >
                  {" "}
                  {vennLabel[2]}
                </button>
              </div>
              <div class="button_container">
                <button
                  class={venntdClass[3]}
                  onClick={() => handleClickTastingNote(3)}
                >
                  {" "}
                  {vennLabel[3]}
                </button>
                <button
                  class={venntdClass[4]}
                  onClick={() => handleClickTastingNote(4)}
                >
                  {" "}
                  {vennLabel[4]}
                </button>
                <button
                  class={venntdClass[5]}
                  onClick={() => handleClickTastingNote(5)}
                >
                  {" "}
                  {vennLabel[5]}
                </button>
              </div>
              Click Tasting Notes for Bottle Info
            </div>
          </table>
        </div>
        ----------------------------------
        <div>
          <button onClick={() => toggleBottleDiv()}>
            {showHideBottleDiv} Bottle Details
          </button>
        </div>
        <div class={divBlockNone}>
          <table>
            <tr>
              <td class="td-bottleHistory"> Dusan Bottle: {dusanBottle} </td>
            </tr>
            <tr>
              {" "}
              <td class="td-bottleHistory"> Bottles Opened </td>{" "}
            </tr>
            <tr class="td-bottleHistory"> Bottle 1: {bottleHistory[0]} </tr>
            <tr class="td-bottleHistory"> Bottle 2: {bottleHistory[1]} </tr>
            <tr class="td-bottleHistory"> Bottle 3: {bottleHistory[2]} </tr>
            <tr class="td-bottleHistory"> Bottle 4: {bottleHistory[3]} </tr>
            <tr class="td-bottleHistory"> Bottle 5: {bottleHistory[4]} </tr>
            <tr class="td-bottleHistory"> Bottle 6: {bottleHistory[5]} </tr>
          </table>
        </div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>.<p></p>.<p></p>.
      </Modal>
    </div>
  );
}
