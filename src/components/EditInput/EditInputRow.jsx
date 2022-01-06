import { IoTrashOutline } from "react-icons/io5";
import "./EditInputRow.css";

export default function EditInputRow({
  item,
  index,
  editRowKeyBoardKey,
  editSoundId,
  deleteRow,
  emptyRowKeyBoardKey,
  sounds,
}) {
  const showDeleteButton = () => {
    if (index > 8) {
      return (
        <button onClick={() => deleteRow(index)}>
          <IoTrashOutline />
        </button>
      );
    }
    return;
  };
  return (
    <div className="padData">
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
      {showDeleteButton()}
    </div>
  );
}
