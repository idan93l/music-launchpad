import { IoTrashOutline } from "react-icons/io5";

export default function EditInputRow({
  item,
  index,
  editRowKeyBoardKey,
  editSoundId,
  deleteRow,
  emptyRowKeyBoardKey,
  sounds,
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
      <select id={index} value={item.id} onChange={editSoundId}>
        {sounds.map((sound, idx) => {
          return (
            <option key={idx} value={sound.id}>
              {sound.id}
            </option>
          );
        })}
      </select>
      <button onClick={() => deleteRow(index)}>
        <IoTrashOutline style={{ color: "red" }} />
      </button>
    </div>
  );
}
