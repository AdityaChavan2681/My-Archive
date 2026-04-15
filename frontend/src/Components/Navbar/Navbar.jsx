import React, { useRef } from "react";
import "./Navbar.css";

import medivalfort1 from "../Assets/medivalfort1.png";
import { Link, useLocation } from "react-router-dom";
import nav_dropdown from "../Assets/nav_dropdown.png";

export const Navbar = () => {
  const menuRef = useRef();

  const location = useLocation();
  const path = location.pathname;

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={medivalfort1} alt="My Arch logo" width="100px" />
        <p>My Arch</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="menu"
      />

      <ul ref={menuRef} className="nav-menu">
        <li>
          <Link style={{ textDecoration: "none" }} to="/">
            All
          </Link>
          {path === "/" ? <hr /> : null}
        </li>

        <li>
          <Link style={{ textDecoration: "none" }} to="/buildings">
            Buildings
          </Link>
          {path === "/buildings" ? <hr /> : null}
        </li>

        <li>
          <Link style={{ textDecoration: "none" }} to="/ships">
            Ships
          </Link>
          {path === "/ships" ? <hr /> : null}
        </li>

        <li>
          <Link style={{ textDecoration: "none" }} to="/others">
            Others
          </Link>
          {path === "/others" ? <hr /> : null}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
