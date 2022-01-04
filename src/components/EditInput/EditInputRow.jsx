import { IoTrashOutline } from 'react-icons/io5';

export default function EditInputRow({
  item,
  index,
  editRowKeyBoardKey,
  editSoundId,
  deleteRow,
  emptyRowKeyBoardKey,
  // emptySoundId,
  sounds,
}) {
  // const [thisKey, setThisKey] = useState("");
  // const [thisId, setThisId] = useState("");
  // const [thisKey, setThisKey] = useState(item.key);
  // const [thisId, setThisId] = useState(item.id);
  // const [thisDrop, setThisDrop] = useState(item.sounds);

  // const checkValidKey = (key) => {
  //   return key.length <= 1 && (key.match(/[A-Z]/i) || key === "")
  // };

  // const toKeyCode = (key) => {
  //   return key ? key.charCodeAt(0) : "";
  // };

  // const handleKey = (e) => {
  //   // const newKey = e.target.value.toUpperCase();
  //   console.log(thisKey);
  //   // setThisKey(newKey);
  //   if (!checkValidKey(thisKey)) return;
  //   // const newKeyCode = toKeyCode(newKey);
  //   const idIndex = item.id;
  //   editRowKeyBoardKey(thisKey, idIndex);
  //   setThisKey("");
  // };

  // const handleId = (e) => {
  //   if (thisId === "") {
  //     return console.log("please add something to do");
  //   }

  //   editSoundId(thisId);

  //   setThisId("");
  // };

  return (
    <div>
      <input
        id={index}
        type="text"
        value={item.key}
        // onChange={e => setThisKey(e.target.value)}
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
      <select
        id={index}
        value={item.id}
        // onChange={handleId}
        onChange={editSoundId}
      >
        {sounds.map((sound, idx) => {
          return (
            <option key={idx} value={sound.id}>
              {sound.id}
            </option>
          );
        })}
      </select>
      <button id={index} onClick={deleteRow}>
      <IoTrashOutline style={{color: "red"}} />
      </button>
      {/* <p>{banner}</p> */}
    </div>
  );
}
