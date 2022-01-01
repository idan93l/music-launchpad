export default function EditInputRow({key, keyboardKey, id, url}) {
  return (
    <div id={key}>
      <input type="text" value={keyboardKey}/>
      <input type="text" value={id}/>
      <input type="text" value={url}/>
    </div>
  )
}