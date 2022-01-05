import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AiFillHome } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

export default function NavBar() {
  return (
    <div className="NavBar">
      <Link to="/" className="flex transition NavBarLink home">
        <p><AiFillHome /></p>
      </Link>
      <div className="space"></div>
      <Link to="/EditLaunchpad" className="flex NavBarLink settings">
        <p><IoSettingsSharp /></p>
      </Link>
      <Link to="/SavedPresets" className="flex NavBarLink savedSets">
        <p><FaSave /></p>
      </Link>
    </div>
  );
}
