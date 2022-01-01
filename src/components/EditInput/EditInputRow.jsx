import Sounds from "../../SoundGroups/Sounds.js";

export default function EditInputRow({
  item,
  index,
  editRowKeyBoardKey,
  editSoundId,
  emptyRowKeyBoardKey,
  emptySoundId
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
      <input
        id={index}
        type="text"
        list="sounds"
        value={item.id}
        onChange={editSoundId}
        onClick={emptySoundId}
      />
      <datalist id="sounds">
        {Sounds.map((sound, idx) => {
          return <option key={idx} value={sound.id}>{sound.id}</option>;
        })}
      </datalist>
    </div>
  );
}
