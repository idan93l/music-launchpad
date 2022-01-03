import React, { useEffect, useState } from "react";
import axios from "axios";
import SoundGroup1 from "../../SoundGroups/SoundGroup1.js";
import SoundGroup2 from "../../SoundGroups/SoundGroup2.js";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";
import { Link } from 'react-router-dom';

export default function EditLaunchpad({ soundGroup, setSoundGroup }) {
  const [soundDatabase, setSoundDatabase] = useState([]);

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

  const toKeyCode = (key) => {
    return key.toUpperCase().charCodeAt(0);
  };

  const isKey = (key) => {
    return key.length === 1 && key.match(/[A-Z]/i);
  };

  const editRowKeyBoardKey = (e) => {
    const newKey = e.target.value;
    if (!isKey(newKey)) return;
      const newKeyCode = toKeyCode(newKey);
      const newSoundGroup = [...soundGroup];
      const item = newSoundGroup[e.target.id];
      item.key = newKey.toUpperCase();
      item.keyCode = newKeyCode;
      setSoundGroup(newSoundGroup);
  };

  // console.log(soundGroup);

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
    const item = newSoundGroup[e.target.id];
    item.id = newId;
    item.url = newUrl;
    setSoundGroup(newSoundGroup);
  };

  const deleteRow = (e) => {
    const newSoundGroup = [...soundGroup];
    newSoundGroup.splice(+e.target.id, 1);
    setSoundGroup(newSoundGroup);
  };

  const emptyRowKeyBoardKey = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[e.target.id];
    item.key = "";
    item.keyCode = "";
    setSoundGroup(newSoundGroup);
  };

  const emptySoundId = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[e.target.id];
    item.id = "";
    item.url = "";
    setSoundGroup(newSoundGroup);
  };

  const createRow = () => {
    const newSoundGroup = [...soundGroup, { key: "", id: "", url: "" }];
    setSoundGroup(newSoundGroup);
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
          emptySoundId={emptySoundId}
          sounds={soundDatabase}
        />
      );
    });
  };

  return (
    <div>
      <br />
      <button onClick={() => setSoundGroup(SoundGroup1)}>Default Preset 1</button>
      <button onClick={() => setSoundGroup(SoundGroup2)}>Default Preset 2</button>
      <br />
      <br />
      {inputRows()}
      <br />
      <br />
      <button onClick={createRow}>Add</button>
      <br />
      <br />
      <Link to='/' className='NavBarButton'>
        BACK TO LAUNCHPAD
      </Link>
    </div>
  );
}
