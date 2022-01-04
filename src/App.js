import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Launchpad from "./pages/Launchpad/Launchpad.jsx";
import EditLaunchpad from "./pages/EditLaunchpad/EditLaunchpad.jsx";
import SoundGroup1 from "./SoundGroups/SoundGroup1.js";
import SoundGroup2 from "./SoundGroups/SoundGroup2.js";

export default function App() {
  const [soundGroup, setSoundGroup] = useState([]);
  // const [preset1, setPreset1] = useState([]);
  // const [preset2, setPreset2] = useState([]);
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);

  // console.log(SoundGroup1);
  // console.log(SoundGroup2);
  // console.log(preset1);
  // console.log(preset2);

  useEffect(() => {
    setSoundGroup(SoundGroup1);
  }, []);

  useEffect(() => {
    UpdateLocalStorage();
  },[])

    const UpdateLocalStorage = () => {
    window.localStorage.setItem('preset1', JSON.stringify(SoundGroup1));
    window.localStorage.setItem('preset2', JSON.stringify(SoundGroup2));
  }
  // const getSoundGroupNumber = (someSoundGroup) => {
  //   if (!someSoundGroup || !someSoundGroup.length) {
  //     return 1;
  //   }
  //   console.log(someSoundGroup);
  //   if (someSoundGroup[0].id === "Heater-1") {
  //     return 1;
  //   }
  //   return 2;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Launchpad
                soundGroup={soundGroup}
                power={power}
                setPower={setPower}
                volume={volume}
                setVolume={setVolume}
              />
            }
          />
          <Route
            path="/EditLaunchpad"
            element={
              <EditLaunchpad
                // key={getSoundGroupNumber(soundGroup)}
                soundGroup={soundGroup}
                setSoundGroup={setSoundGroup}
                // preset1={preset1}
                // preset2={preset2}
                // setPreset1={setPreset1}
                // setPreset2={setPreset2}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
