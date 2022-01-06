import { BsDownload } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import "./SavedSetRow.css"

export default function SavedSetRow({ index, loadSavedSet, deleteSet }) {
  return (
    <div className="folder">
      <div className="folderButtons">
      <button onClick={() => loadSavedSet(index)}>
        <BsDownload className="armSet"/>
      </button>
      <button onClick={() => deleteSet(index)}>
        <IoTrashOutline className="deleteSet"/>
      </button>
      </div>
      <p>{`SAVED SET ${index}`}</p>
    </div>
  );
}
