import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AiFillHome } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";

export default function NavBar() {
  return (
    <div className="NavBar">
      <Link to="/" className="flex NavBarLink">
        <p><AiFillHome /></p>
      </Link>
      <div className="home"></div>
      <Link to="/EditLaunchpad" className="flex NavBarLink">
        <p><IoSettingsSharp /></p>
      </Link>
      <Link to="/SavedPresets" className="flex NavBarLink">
        <p>SAVED SETS</p>
      </Link>
    </div>
  );
}
