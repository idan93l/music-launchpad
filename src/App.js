import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Launchpad from "./pages/Launchpad/Launchpad.jsx";
import EditLaunchpad from "./pages/EditLaunchpad/EditLaunchpad.jsx";
import SoundGroup1 from "./SoundGroups/SoundGroup1.js";
// import Sounds from "./SoundGroups/Sounds.js";

export default function App() {
  const [soundGroup, setSoundGroup] = useState([]);

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const FetchedSoundGroup = SoundGroup1;
    //     setSoundGroup(FetchedSoundGroup);
    //     // console.log(FetchedSoundGroup);
    //   } catch (error) {
    //     console.log(`Could not load sound group`);
    //   }
    // };
    // getData();
    setSoundGroup(SoundGroup1);
  }, []);

  // useEffect(() => {
  //   UpdateLocalStorage();
  // })

  //   const UpdateLocalStorage = () => {
  //   window.localStorage.setItem('lastUpdate', JSON.stringify(soundGroup));
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Launchpad soundGroup={soundGroup}/>} />
          <Route
            path="/EditLaunchpad"
            element={
              <EditLaunchpad
                soundGroup={soundGroup}
                setSoundGroup={setSoundGroup}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
