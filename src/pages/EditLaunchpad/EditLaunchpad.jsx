import React, { useEffect, useState } from "react";
import axios from "axios";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";
import { Link } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import "./EditLaunchpad.css"

export default function EditLaunchpad({
  soundGroup,
  setSoundGroup,
  storageLength,
  presetToggle,
  setPresetToggle,
}) {
  const [soundDatabase, setSoundDatabase] = useState([]);
  const [banner, setBanner] = useState("");
  const [letters, setLetters] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://61d163d7da87830017e59204.mockapi.io/SoundsData`
        );
        setSoundDatabase(data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const updateLetters = () => {
      let letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < soundGroup.length; i++) {
        letterString = letterString.replace(soundGroup[i].key, "");
      }
      // console.log(letterString);
      setLetters(letterString);
    };
    updateLetters();
  }, [soundGroup]);

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
    return true;
  };

  const isKeyAlphabetical = (thisKey) => {
    if (!thisKey.match(/[A-Z]/i)) {
      setBanner("ALPHABETICAL CHARACTERS ONLY");
      return false;
    }
    return true;
  };

  const checkValidKey = (key) => {
    return (
      key.length <= 1 &&
      (isKeyAlphabetical(key) || key === "") &&
      keyAppear(key)
    );
  };

  const editRowKeyBoardKey = (e) => {
    const newKey = e.target.value.toUpperCase();
    if (!checkValidKey(newKey)) return;
    setBanner("");
    const newKeyCode = toKeyCode(newKey);
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[+e.target.id];
    item.key = newKey;
    item.keyCode = newKeyCode;
    setSoundGroup(newSoundGroup);
  };

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
    item.id = newId;
    item.url = newUrl;
    setSoundGroup(newSoundGroup);
  };

  const deleteRow = (idx) => {
    const newSoundGroup = [...soundGroup];
    newSoundGroup.splice(idx, 1);
    setSoundGroup(newSoundGroup);
  };

  const emptyRowKeyBoardKey = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[+e.target.id];
    item.key = "";
    item.keyCode = "";
    setBanner("EMPTY INPUT/S");
    setSoundGroup(newSoundGroup);
  };

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

  const addSet = () => {
    window.localStorage.setItem(
      `savedSet${storageLength + 1}`,
      JSON.stringify(soundGroup)
    );
    presetToggle === 1 ? setPresetToggle(0) : setPresetToggle(1);
  };

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
    <div className="flex page">
      <div className="editContainer">
      <button
        onClick={() =>
          setSoundGroup(JSON.parse(localStorage.getItem("default1")))
        }
      >
        Default Preset 1
      </button>
      <button
        onClick={() =>
          setSoundGroup(JSON.parse(localStorage.getItem("default2")))
        }
      >
        Default Preset 2
      </button>
      {inputRows()}
      <button onClick={createRow}>
        <GrAdd />
      </button>
      <button onClick={addSet}>
        <FiSave />
      </button>
      <h1>{banner}</h1>
      <Link to="/" className="NavBarButton">
        <MdDone />
      </Link>
      </div>
    </div>
  );
}
