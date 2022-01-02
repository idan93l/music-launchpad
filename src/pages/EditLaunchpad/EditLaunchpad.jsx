// import React, { useEffect, useState } from "react";
// import SoundGroup1 from "../../SoundGroups/SoundGroup1.js";
import Sounds from "../../SoundGroups/Sounds.js";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";

export default function EditLaunchpad({ soundGroup, setSoundGroup, soundDatabase }) {

  const editRowKeyBoardKey = (e) => {
    const newSoundGroup = [...soundGroup];
    const item = newSoundGroup[e.target.id];
    const newKey = e.target.value;
    // if (newKey === null || newKey === "") {
    //   return;
    // } else {
    item.key = newKey.toUpperCase();
    // }
    setSoundGroup(newSoundGroup);
  };

  const findSoundUrl = (value) => {
    for (let i = 0; i < Sounds.length; i++) {
      if (Sounds[i].id === value) {
        return Sounds[i].url;
      }
    }
  };

  const editSoundId = (e) => {
    const newSoundGroup = [...soundGroup];
    const newUrl = findSoundUrl(e.target.value);
    const item = newSoundGroup[e.target.id];
    const newKey = e.target.value;
    item.id = newKey;
    item.url = newUrl;
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

  const inputRows = () => {
    return soundGroup.map((item, index) => {
      return (
        <EditInputRow
          key={index}
          item={item}
          index={index}
          editRowKeyBoardKey={editRowKeyBoardKey}
          editSoundId={editSoundId}
          emptyRowKeyBoardKey={emptyRowKeyBoardKey}
          emptySoundId={emptySoundId}
          sounds={soundDatabase}
        />
      );
    });
  };

  return <div>{inputRows()}</div>;
}
