export default function Pad({info, play}) {
  return (
    <div>
    <button onClick={() => play(info.keyCode, info.id)}>{info.key}</button>
    <audio src={info.url} id={info.keyCode}/>
    </div>
  )
}