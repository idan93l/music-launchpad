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
        <p className="launchpadKey">{info.key}</p>
      </button>
      <audio src={info.url} id={info.keyCode} />
    </div>
  );
}
