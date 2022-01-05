import { useEffect, useState } from "react";
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
  const [deleteButton, setDeleteButton] = useState(false);
  useEffect(() => {
    // index > 8 ? setDeleteButton(true) : setDeleteButton(false)
    if (index > 8) {
      setDeleteButton(true);
    }
  });

  const showDeleteButton = () => {
    if (deleteButton) {
      return (
        <button onClick={() => deleteRow(index)}>
          <IoTrashOutline style={{ color: "red" }} />
        </button>
      );
    }
    return;
  };
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
      {showDeleteButton()}
    </div>
  );
}
