import React, { useState, useEffect } from "react";
import Pad from "../../components/Pad/Pad.jsx";
import { Link } from 'react-router-dom';

export default function Launchpad({ soundGroup, power, setPower, volume, setVolume }) {
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
    if (!keyCode || !sound || !power) return;
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

  const handleVolumeChange = e => {
    setVolume(e.target.value)
  }
  
  const setKeyVolume = () => {
    const audioes = soundGroup.map(sound => document.getElementById(sound.keyCode));
    audioes.forEach(audio => {
      if(audio) {
        audio.volume = volume;
      }
    }) 
  }

  const powerHandler = () => {
    return power ? setPower(false) : setPower(true)
  }

  return (
    <div>
      <br />
      {setKeyVolume()}
      <button onClick={powerHandler}>POWER</button>
      <h1>{soundName.toUpperCase()}</h1>
      {pads()}
      <br />
      <h2>VOLUME: {Math.round(volume * 100)}</h2>
      <input
      max="1"
      min="0"
      step='0.01'
      type="range"
      value={volume}
      onChange={handleVolumeChange}
      />
      <br />
      <br />
      <Link to='/EditLaunchpad' className='NavBarButton'>
        CUSTOMIZE
      </Link>
    </div>
  );
}
