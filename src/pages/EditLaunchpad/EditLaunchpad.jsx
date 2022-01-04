import React, { useEffect, useState } from "react";
import axios from "axios";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";
import { Link } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
// import SoundGroup1 from "../../SoundGroups/SoundGroup1.js";
// import SoundGroup2 from "../../SoundGroups/SoundGroup2.js";
// import preset1 from "../../SoundGroups/apreset1.js";

export default function EditLaunchpad({
  soundGroup,
  setSoundGroup,
  // preset1,
  // setPreset1,
  // preset2,
  // setPreset2
}) {
  const [soundDatabase, setSoundDatabase] = useState([]);
  // const [filteredSoundDatabase, setFilteredSoundDatabase] = useState([]);
  const [banner, setBanner] = useState("");
  // const [usedLetters, setUsedLetters] = useState("");
  const [letters, setLetters] = useState("");
  // const [letters, setLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  // console.log(preset1);
  // console.log(SoundGroup2);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://61d163d7da87830017e59204.mockapi.io/SoundsData`
        );
        setSoundDatabase(data);
        // setFilteredSoundDatabase(data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const updateLetters = () => {
  //     let letterString = usedLetters;
  //     for (let i = 0; i < soundGroup.length; i++) {
  //       letterString += soundGroup[i].key
  //     }
  //     setUsedLetters(letterString);
  //   };
  //   updateLetters();
  // }, [soundGroup]);

  useEffect(() => {
    const updateLetters = () => {
      let letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // let letterString = letters;
      for (let i = 0; i < soundGroup.length; i++) {
        letterString = letterString.replace(soundGroup[i].key, "");
      }
      // console.log(letterString);
      setLetters(letterString);
    };
    updateLetters();
  }, [soundGroup]);

  // useEffect(() => {
  //   const updateData = () => {
  //     let newData = filteredSoundDatabase;
  //     // let letterString = letters;
  //     for (let i = 0; i < soundGroup.length; i++) {
  //       for (let j = 0; j < newData.length; j++) {
  //         if (soundGroup[i].id === newData[j].id) newData.splice(j, 1);
  //       }
  //     }
  //     // console.log(newData);
  //     setFilteredSoundDatabase(newData);
  //   };
  //   updateData();
  // }, [soundGroup]);

  // console.log(usedLetters);
  // console.log(letters);
  // console.log(filteredSoundDatabase);

  const toKeyCode = (key) => {
    return key ? key.charCodeAt(0) : "";
  };

  const keyAppear = (thisKey) => {
    for (let i = 0; i < soundGroup.length; i++) {
      if (soundGroup[i].key === thisKey) {
        setBanner("KEY ALREADY USED");
        return false;
      }
    }
    // setBanner("");
    return true;
  };

  // const keyLength = (thisKey) => {
  //   if (!thisKey.length <= 1) {
  //     setBanner("EMPTY FIELD");
  //     return false;
  //   }
  //   // setBanner("");
  //   return true;
  // };

  const isKeyAlphabetical = (thisKey) => {
    if (!thisKey.match(/[A-Z]/i)) {
      setBanner("ALPHABETICAL CHARACTERS ONLY");
      return false;
    }
    // setBanner("");
    return true;
  };

  const checkValidKey = (key) => {
    // return key.length <= 1 && (key.match(/[A-Z]/i) || key === "");
    // return key.length <= 1 && (key.match(/[A-Z]/i) || key === "") && keyAppear(key);
    return (
      key.length <= 1 &&
      (isKeyAlphabetical(key) || key === "") &&
      keyAppear(key)
    );
    // return keyAppear(key) && keyLength(key) && (isKeyAlphabetical(key) || key === "");
  };

  const editRowKeyBoardKey = (e) => {
    const newKey = e.target.value.toUpperCase();
    if (!checkValidKey(newKey)) return;
    // if (!checkValidKey(newKey)) {
    //   if (banner) {
    //     setBanner("SINGLE ALPHABETICAL CHARACTER ONLY");
    //   }
    //   return;
    // }
    setBanner("");
    const newKeyCode = toKeyCode(newKey);
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[+e.target.id];
    item.key = newKey;
    item.keyCode = newKeyCode;
    setSoundGroup(newSoundGroup);
  };

  // const editRowKeyBoardKey = (inputKey, index) => {
  //   // const newKey = inputKey.toUpperCase();
  //   // if (!checkValidKey(newKey)) return;
  //   const newSoundGroup = [...soundGroup];
  //   const newKeyCode = toKeyCode(inputKey);
  //   const item = newSoundGroup[index];
  //   item.key = inputKey;
  //   item.keyCode = newKeyCode;
  //   setSoundGroup(newSoundGroup);
  // };

  const findSoundUrl = (value) => {
    for (let i = 0; i < soundDatabase.length; i++) {
      if (soundDatabase[i].id === value) {
        return soundDatabase[i].url;
      }
    }
  };

  const editSoundId = (e) => {
    const newId = e.target.value;
    const newSoundGroup = [...soundGroup];
    const newUrl = findSoundUrl(e.target.value);
    const item = newSoundGroup[+e.target.id];
    // console.log(item);
    item.id = newId;
    item.url = newUrl;
    setSoundGroup(newSoundGroup);
  };

  // const editSoundId = (e) => {
  //   const newId = e.target.value;
  //   const newSoundGroup = [...soundGroup];
  //   const newUrl = findSoundUrl(e.target.value);
  //   const item = newSoundGroup[+e.target.id];
  //   console.log(item);
  //   item.id = newId;
  //   item.url = newUrl;
  //   setSoundGroup(newSoundGroup);
  // };

  const deleteRow = (e) => {
    const newSoundGroup = [...soundGroup];
    newSoundGroup.splice(+e.target.id, 1);
    setSoundGroup(newSoundGroup);
  };

  const emptyRowKeyBoardKey = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[+e.target.id];
    item.key = "";
    item.keyCode = "";
    setSoundGroup(newSoundGroup);
  };

  // const emptySoundId = (e) => {
  //   const newSoundGroup = [...soundGroup];
  //   const item = newSoundGroup[e.target.id];
  //   item.id = "";
  //   item.url = "";
  //   setSoundGroup(newSoundGroup);
  // };

  // const updateLetters = () => {
  //   let lettersArray = letters;
  //   for (let i = 0; i < soundGroup.length; i++) {
  //     lettersArray = lettersArray.replace(soundGroup[i], "");
  //   }
  //   setLetters(lettersArray);
  // };

  const randomData = (data) => {
    return Math.floor(Math.random() * data.length);
  };

  const filterSoundData = () => {
    let newData = [...soundDatabase];
    // let letterString = letters;
    for (let i = 0; i < soundGroup.length; i++) {
      for (let j = 0; j < newData.length; j++) {
        if (soundGroup[i].id === newData[j].id) newData.splice(j, 1);
      }
    }
    return newData;
  };

  const createRow = () => {
    const newSoundData = filterSoundData();
    console.log(newSoundData);
    const randomLetter = letters[randomData(letters)];
    const randomId = newSoundData[randomData(newSoundData)];
    // const randomId = filteredSoundDatabase[randomData(filteredSoundDatabase)];
    const letterCode = toKeyCode(randomLetter);
    const newSoundGroup = [
      ...soundGroup,
      {
        keyCode: letterCode,
        key: randomLetter,
        id: randomId.id,
        url: randomId.url,
      },
    ];
    setSoundGroup(newSoundGroup);
  };

  // const loadPreset = (preset) => {
  //   const newSoundGroup = [...preset];
  //   setSoundGroup(newSoundGroup);
  // };

  const inputRows = () => {
    return soundGroup.map((item, index) => {
      return (
        <EditInputRow
          key={index}
          item={item}
          index={index}
          editRowKeyBoardKey={editRowKeyBoardKey}
          editSoundId={editSoundId}
          deleteRow={deleteRow}
          emptyRowKeyBoardKey={emptyRowKeyBoardKey}
          sounds={soundDatabase}
        />
      );
    });
  };

  return (
    <div>
      <br />
      <button
        onClick={() =>
          setSoundGroup(JSON.parse(localStorage.getItem("preset1")))
        }
      >
        Default Preset 1
      </button>
      <button
        onClick={() =>
          setSoundGroup(JSON.parse(localStorage.getItem("preset2")))
        }
      >
        Default Preset 2
      </button>
      {/* <button onClick={() => setPreset1(SoundGroup1)}>Default Preset 1</button>
      <button onClick={() => setPreset2(SoundGroup2)}>Default Preset 2</button> */}
      <br />
      <br />
      {inputRows()}
      <br />
      <button onClick={createRow}>ADD</button>
      <br />
      <br />
      <h1>{banner}</h1>
      <br />
      <Link to="/" className="NavBarButton">
        DONE
      </Link>
    </div>
  );
}
