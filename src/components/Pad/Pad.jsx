import "./Pad.css"

export default function Pad({ info, play }) {
  return (
    <div>
      <button className="pad" onClick={() => play(info.keyCode, info.id)}>{info.key}</button>
      <audio src={info.url} id={info.keyCode} />
    </div>
  );
}
