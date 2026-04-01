import React, {useState,useContext,useRef } from "react";
import './Navbar.css'

import medivalfort1 from '../Assets/medivalfort1.png';
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { AllContext } from "../../Context/AllContext";
import nav_dropdown from '../Assets/nav_dropdown.png'

export const Navbar = () => {
  const [menu,setMenu] = useState("all");
  const { getTotalCartItems } = useContext(AllContext)
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={medivalfort1} alt=" " width="100px"/>
        <p>My Arch</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{ setMenu("all")}}><Link style={{textDecoration: 'none'}} to='/'>All</Link>{menu==="all"?<hr/>:<></>}</li>
        <li onClick={() => { setMenu("buildings") }}><Link style={{ textDecoration: 'none' }} to='/buildings'>Buildings</Link>{menu ==="buildings"?<hr/>:<></>}</li>
        <li onClick={() => { setMenu("ships") }}><Link style={{ textDecoration: 'none' }} to='/ships'>Ships</Link>{menu ==="ships"?<hr/>:<></>}</li>
        <li onClick={() => { setMenu("others") }}><Link style={{ textDecoration: 'none' }} to='/others'>Others</Link>{menu ==="others"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
export default Navbar