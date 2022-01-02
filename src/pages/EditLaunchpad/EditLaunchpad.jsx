import React, { useEffect, useState } from "react";
import axios from "axios";
// import SoundGroup1 from "../../SoundGroups/SoundGroup1.js";
import Sounds from "../../SoundGroups/Sounds.js";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";

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
  },[]);

  const editRowKeyBoardKey = (e) => {
    const newKey = e.target.value;
    if (newKey === null || newKey === "") return
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[e.target.id];
    item.key = newKey.toUpperCase();
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
    if (newId === null || newId === "") return
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
    setSoundGroup(newSoundGroup);
  };

  const emptySoundId = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[e.target.id];
    item.id = "";
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

  return <div>
    {inputRows()}
    <br />
    <br />
    <button onClick={createRow}>Add</button>
    </div>;
}
