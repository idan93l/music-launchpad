import React, { useState, useEffect } from "react";
import Pad from "../../components/Pad/Pad.jsx";
import { Link } from 'react-router-dom';

export default function Launchpad({ soundGroup }) {
  const [soundName, setSoundName] = useState("Ready");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const findSoundName = (keyCode) => {
    for (let i = 0; i < soundGroup.length; i++) {
      if (soundGroup[i].keyCode === keyCode) return soundGroup[i].id;
    }
  };

  const handleKeyDown = (e) => {
    const someKey = e.keyCode;
    const keyName = findSoundName(someKey);
    play(someKey, keyName);
  };

  const play = (keyCode, sound) => {
    if (!keyCode || !sound) return;
    setSoundName(sound);
    const audio = document.getElementById(keyCode);
    audio.currentTime = 0;
    audio.play();
  };

  const pads = () => {
    return soundGroup.map((dataPad, index) => {
      return <Pad key={index} info={dataPad} index={index} play={play} />;
    });
  };

  return (
    <div>
      <h1>{soundName.toUpperCase()}</h1>
      {pads()}
      <br />
      <Link to='/EditLaunchpad' className='NavBarButton'>
        CUSTOMIZE
      </Link>
    </div>
  );
}
