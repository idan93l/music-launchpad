import { useEffect, useState } from "react";
import "./Pad.css"

export default function Pad({ info, play }) {
  const [emptyKey, setEmptyKey] = useState("");
  useEffect(() => {
    if (info.key === "") {
      setEmptyKey("empty")
    }
  }, [info.key])
  return (
    <div>
      <button className={`pad ${emptyKey}`} onClick={() => play(info.keyCode, info.id)}>{info.key}</button>
      <audio src={info.url} id={info.keyCode} />
    </div>
  );
}
