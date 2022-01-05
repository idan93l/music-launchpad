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
  const [soundName, setSoundName] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    return power ? setSoundName("ready") : setSoundName("off");
  },[power])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSoundName("");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [soundName]);

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

  const pressed = (audio) => {
    audio.previousElementSibling.style.borderColor = "#00ff55";
    audio.previousElementSibling.style.color = "#00ff55";
    setTimeout(() => {
      audio.previousElementSibling.style.borderColor = "";
      audio.previousElementSibling.style.color = "";
    }, 200);
  };

  const play = (keyCode, sound) => {
    if (!keyCode || !sound || !power || volume === "0") return;
    setSoundName(sound);
    const audio = document.getElementById(keyCode);
    audio.currentTime = 0;
    audio.play();
    pressed(audio);
  };

  const pads = () => {
    return soundGroup.map((dataPad, index) => {
      return <Pad key={index} info={dataPad} index={index} play={play} power={power}/>;
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

  const toggleColor = () => {
    return power ? "on" : "off";
  }

  const toggleSwitch = () => {
    return power ? <MdMusicNote /> : <MdMusicOff />;
  }

  const powerHandler = () => {
    if (power) {
      setPower(false);
      setSoundName("off");
      setVolume(0);
    } else {
      setPower(true);
      setSoundName("on");
      setVolume(0.5);
    }
  };

  return (
    <div className="flex page">
      <div className="launchpadContainer">
        {setKeyVolume()}
        <button className={`switch ${toggleColor()}`} onClick={powerHandler}>
          {toggleSwitch()}
        </button>
        <div className="flex miniScreen soundName">
          <h3>{soundName.toUpperCase()}</h3>
        </div>
        <div className="padsContainer">{pads()}</div>
        <div className="flex miniScreen volume">
          <h3>{Math.round(volume * 100)}%</h3>
        </div>
        <input
          disabled={!power}
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
