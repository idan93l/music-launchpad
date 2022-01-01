export default function Pad({info, play}) {
  return (
    <div>
    <button id={info.keyCode} onClick={() => play(info.key, info.id)}>{info.key}</button>
    <audio src={info.url} id={info.key}/>
    </div>
  )
}