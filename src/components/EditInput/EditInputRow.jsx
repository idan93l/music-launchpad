export default function EditInputRow({
  item,
  index,
  editRowKeyBoardKey,
  editSoundId,
  deleteRow,
  emptyRowKeyBoardKey,
  emptySoundId,
  sounds
}) {

  return (
    <div>
      <input
        id={index}
        type="text"
        value={item.key}
        onChange={editRowKeyBoardKey}
        onClick={emptyRowKeyBoardKey}
      />
      {/* <input
        id={index}
        type="text"
        list="sounds"
        value={item.id}
        onChange={editSoundId}
        onClick={emptySoundId}
      /> */}
      <select id={index} value={item.id} onChange={editSoundId}>
        {sounds.map((sound, idx) => {
          return <option key={idx} value={sound.id}>{sound.id}</option>;
        })}
      </select>
      <button id={index} onClick={deleteRow}>DELETE</button>
    </div>
  );
}
