import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='NavBar'>
      <Link to='/' className='NavBarButton'>
        HOME
      </Link>
      <Link to='/EditLaunchpad' className='NavBarButton'>
        EDIT LAUNCHPAD
      </Link>
      <Link to='/SavedPresets' className='NavBarButton'>
        SAVED PRESETS
      </Link>
    </div>
  );
}