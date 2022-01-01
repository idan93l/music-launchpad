import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='NavBar'>
      <Link to='/' className='NavBarButton'>
        Home
      </Link>
      <Link to='/EditLaunchpad' className='NavBarButton'>
        Edit Launchpad
      </Link>
    </div>
  );
}