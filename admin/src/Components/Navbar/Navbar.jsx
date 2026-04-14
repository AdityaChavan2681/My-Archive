import React from 'react';
import './Navbar.css';
import ancientscrollicon from '../../assets/ancientscrollicon.png';
import navProfile from '../../assets/nav-profile.svg';
import { adminAuth } from '../../api';

const Navbar = () => {
  const isAuthenticated = Boolean(adminAuth.getToken());

  return (
    <div className='navbar'>
      <img className="nav-logo" src={ancientscrollicon} alt="logo" width="100px" />
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {isAuthenticated ? (
          <button
            onClick={() => {
              adminAuth.clearToken();
              window.location.reload();
            }}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "999px",
              background: "#ffffff",
              padding: "8px 14px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        ) : null}
        <img className="nav-profile" src={navProfile} alt={navProfile} />
      </div>
    </div>
  )
}

export default Navbar
