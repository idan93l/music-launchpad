import React, { useState, useEffect } from "react";
import Pad from "../../components/Pad/Pad.jsx";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import "./Launchpad.css";

export default function Launchpad({
  soundGroup,
  power,
  setPower,
  volume,
  setVolume,
}) {
  const [soundName, setSoundName] = useState("Ready");
  const [onOff, setOnOff] = useState(<MdMusicNote />);
  const [toggleColor, setToggleColor] = useState("on")

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
    if (!keyCode || !sound || !power || volume === "0") return;
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

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const setKeyVolume = () => {
    const audioes = soundGroup.map((sound) =>
      document.getElementById(sound.keyCode)
    );
    audioes.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  const powerHandler = () => {
    if (power) {
      setPower(false);
      setOnOff(<MdMusicOff />);
      setToggleColor("off");
    } else {
      setPower(true);
      setOnOff(<MdMusicNote />);
      setToggleColor("on");
    }
  };

  return (
    <div className="flex page">
      <div className="circuitry"></div>
      <div className="launchpadContainer">
        {setKeyVolume()}
        <button className={`switch ${toggleColor}`} onClick={powerHandler}>{onOff}</button>
        <div className="flex miniScreen soundName"><h3>{soundName.toUpperCase()}</h3></div>
        <div className="padsContainer">{pads()}</div>
        <div className="flex miniScreen volume"><h3>{Math.round(volume * 100)}%</h3></div>
        <input
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={volume}
          onChange={handleVolumeChange}
        />
        {/* <Link to="/EditLaunchpad" className="NavBarButton">
        CUSTOMIZE
      </Link> */}
      </div>
    </div>
  );
}
