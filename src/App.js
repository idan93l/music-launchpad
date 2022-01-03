import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Launchpad from "./pages/Launchpad/Launchpad.jsx";
import EditLaunchpad from "./pages/EditLaunchpad/EditLaunchpad.jsx";
import SoundGroup1 from "./SoundGroups/SoundGroup1.js";

export default function App() {
  const [soundGroup, setSoundGroup] = useState([]);

  useEffect(() => {
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
