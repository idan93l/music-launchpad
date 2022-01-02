import React, { useState, useEffect } from "react";
import Pad from "../../components/Pad/Pad.jsx";

export default function Launchpad() {
  const [padSounds, setPadSounds] = useState([]);
  const [soundName, setSoundName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const FetchedSoundGroup = loadFromLocalStorage();
        setPadSounds(FetchedSoundGroup);
      } catch (error) {
        console.log(`Could not load pad sounds`);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {document.removeEventListener("keydown", handleKeyDown)}
  });

  const loadFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem("lastUpdate"));
  };

  const findSoundName = (key) => {
    for(let i = 0; i < padSounds.length; i++) {
      if(padSounds[i].key === key)
        return padSounds[i].id
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
    return padSounds.map((dataPad, index) => {
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
