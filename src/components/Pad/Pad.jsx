// import { useEffect, useState } from "react";
import "./Pad.css";

export default function Pad({ info, play, power}) {
  const emptyKey = () => {
    if (info.key === "") {
      return "empty";
    }
  };

  const soundOff = () => {
    if (!power) {
      return "soundOff";
    }
  };

  return (
    <div>
      <button
        className={`pad ${soundOff()} ${emptyKey()}`}
        onClick={() => play(info.keyCode, info.id)}
      >
        {info.key}
      </button>
      <audio src={info.url} id={info.keyCode} />
    </div>
  );
}
