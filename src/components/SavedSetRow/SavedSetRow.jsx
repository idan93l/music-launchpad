import { BsDownload } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

export default function SavedSetRow({ index, loadSavedSet, deleteSet }) {
  return (
    <div>
      <h3>{`SAVED SET ${index}`}</h3>
      <button onClick={() => loadSavedSet(index)}>
        <BsDownload />
      </button>
      <button onClick={() => deleteSet(index)}>
        <IoTrashOutline style={{ color: "red" }} />
      </button>
    </div>
  );
}
