import React, { useState, useEffect } from "react";
import Pad from "../../components/Pad/Pad.jsx";

export default function Launchpad({soundGroup}) {
  const [soundName, setSoundName] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {document.removeEventListener("keydown", handleKeyDown)}
  });

  const findSoundName = (key) => {
    for(let i = 0; i < soundGroup.length; i++) {
      if(soundGroup[i].key === key)
        return soundGroup[i].id
    }
  }

  const handleKeyDown = (e) => {
    const someKey = e.key.toUpperCase()
    const keyName = findSoundName(someKey)
    play(someKey, keyName);
  };

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    // styleActiveKey(audio);
    audio.currentTime = 0;
    audio.play();
    // deactivateAudio(audio);
  };

  const pads = () => {
    return soundGroup.map((dataPad, index) => {
      return <Pad key={index} info={dataPad} index={index} play={play} />;
    });
  };

  return (
    <div>
      {pads()}
      <h1>{soundName}</h1>
    </div>
  );
}
