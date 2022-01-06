import SavedSetRow from "../../components/SavedSetRow/SavedSetRow.jsx";
import { FiDelete } from "react-icons/fi";
import "./SavedPresets.css";

export default function SavedPresets({
  setSoundGroup,
  localPresets,
  deleteAllSavedSets,
  presetToggle,
  setPresetToggle,
}) {
  const loadSavedSet = (idx) => {
    setSoundGroup(JSON.parse(localStorage.getItem(`savedSet${idx}`)));
  };

  const deleteSet = (idx) => {
    localStorage.removeItem(`savedSet${idx}`);
    presetToggle === 1 ? setPresetToggle(0) : setPresetToggle(1);
  };

  const savedSetsList = () => {
    if (localPresets.length === 0) return <h1 style={{height: "500px"}}>NO SAVED SETS TO SHOW</h1>;
    return localPresets.map((item, index) => {
      return (
        <SavedSetRow
          key={index}
          index={index+1}
          loadSavedSet={loadSavedSet}
          deleteSet={deleteSet}
        />
      );
    });
  };

  const deleteButton = () => {
    if (localPresets.length > 0)
      return <button className="delete" onClick={deleteAllSavedSets}><FiDelete /></button>;
  };

  return (
    <div className="flex page">
      <div className="foldersContainer">
        {deleteButton()}
        <div className="gridFolders">
        {savedSetsList()}
        </div>
      </div>
    </div>
  );
}
