import React from 'react';
import './Navbar.css';
import ancientscrollicon from '../../assets/ancientscrollicon.png';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className="nav-logo" src={ancientscrollicon} alt="logo" width="100px" />
      <img className="nav-profile" src={navProfile} alt={navProfile} />
    </div>
  )
}

export default Navbar
