import React, { useEffect, useState } from "react";
import SoundGroup1 from "../../SoundGroups/SoundGroup1.js";
import EditInputRow from "../../components/EditInput/EditInputRow.jsx";

export default function EditLaunchpad() {
  const [SoundGroup, SetSoundGroup] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // const { data } = await axios.get(
        //   `https://api.chucknorris.io/jokes/categories`
        // );
        const FetchedSoundGroup = SoundGroup1;
        SetSoundGroup(FetchedSoundGroup);
        // console.log(FetchedSoundGroup);
      } catch (error) {
        console.log(`Could not load sound group`);
      }
    };
      getData();
  }, []);

  const InputRows = () => {
    return SoundGroup.map(item => {
      return <EditInputRow key={item.keyCode} keyboardKey={item.key} id={item.id} url={item.url} />
    })
  }

  return (
    <div>
      {InputRows()}
    </div>
  );
}