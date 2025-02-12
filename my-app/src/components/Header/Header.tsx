import { Link, NavLink, Outlet } from "react-router-dom";
import React from "react";
import './header.css';
const Header = () => {
    return ( 
      <>
     
       <header className="container">
       <Link to='/' style={{
                  textDecoration: 'none', 
                  color: 'black'
              }}>Realworld Blog</Link>
      <div className="button-container">
       <NavLink to='/sign-in' className='link'>Sign In</NavLink>
      <NavLink to='/sign-up' className='link'>Sign Up</NavLink>
      </div>
      </header> 
      <main>
      <Outlet/>
      </main>
    
       </>
     );
}
 
export default Header;
