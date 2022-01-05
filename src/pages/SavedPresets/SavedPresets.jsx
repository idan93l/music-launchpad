import SavedSetRow from "../../components/SavedSetRow/SavedSetRow.jsx";

export default function SavedPresets({
  setSoundGroup,
  localPresets,
  deleteAllSavedSets,
  presetToggle,
  setPresetToggle
}) {

  const loadSavedSet = (idx) => {
    setSoundGroup(JSON.parse(localStorage.getItem(`savedSet${idx}`)));
  };

  const deleteSet = (idx) => {
    localStorage.removeItem(`savedSet${idx}`);
    presetToggle === 1 ? setPresetToggle(0) : setPresetToggle(1);
  }

  const savedSetsList = () => {
    if (localPresets.length === 0) return <h1>NO SAVED SETS TO SHOW</h1>;
    return localPresets.map((item, index) => {
      return <SavedSetRow key={index} index={item[item.length-1]} loadSavedSet={loadSavedSet} deleteSet={deleteSet}/>;
    });
  };

  const deleteButton = () => {
    if (localPresets.length > 0) return <button onClick={deleteAllSavedSets}>DELETE ALL</button>;
  }

  return (
    <div>
      {savedSetsList()}
      {deleteButton()}
    </div>
  );
}
