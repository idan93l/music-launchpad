import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Launchpad from "./pages/Launchpad/Launchpad.jsx";
import EditLaunchpad from "./pages/EditLaunchpad/EditLaunchpad.jsx";
import SavedPresets from "./pages/SavedPresets/SavedPresets.jsx";
import SoundGroup1 from "./SoundGroups/SoundGroup1.js";
import SoundGroup2 from "./SoundGroups/SoundGroup2.js";
import "./App.css"

export default function App() {
  const [soundGroup, setSoundGroup] = useState([]);
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(0.5);
  const [localPresets, setLocalPresets] = useState([]);
  const [presetToggle, setPresetToggle] = useState(1);

  useEffect(() => {
    setSoundGroup(SoundGroup1);
    initialLocalStorage();
  }, []);

  useEffect(() => {
    const storage = [];
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "default1" && keys[i] !== "default2")
        storage.push(keys[i]);
    }
    setLocalPresets(storage.sort());
  }, [presetToggle]);

  const initialLocalStorage = () => {
    window.localStorage.setItem("default1", JSON.stringify(SoundGroup1));
    window.localStorage.setItem("default2", JSON.stringify(SoundGroup2));
  };

  const deleteAllSavedSets = () => {
    if (localPresets.length === 0) return;
    localPresets.forEach((item) => {
      localStorage.removeItem(item);
    });
    setLocalPresets([]);
  };

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
                soundGroup={soundGroup}
                setSoundGroup={setSoundGroup}
                storageLength={localPresets.length}
                presetToggle={presetToggle}
                setPresetToggle={setPresetToggle}
              />
            }
          />
          <Route
            path="/SavedPresets"
            element={
              <SavedPresets
                setSoundGroup={setSoundGroup}
                localPresets={localPresets}
                deleteAllSavedSets={deleteAllSavedSets}
                presetToggle={presetToggle}
                setPresetToggle={setPresetToggle}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
