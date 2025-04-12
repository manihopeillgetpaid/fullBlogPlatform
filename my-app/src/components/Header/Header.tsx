import { Link, NavLink, Outlet } from "react-router-dom";
import React from "react";
import styles from './header.module.scss';
const Header = () => {
    return ( 
      <>
       <header className={styles.containerNo}>
        <Link to='/' style={{
                    textDecoration: 'none', 
                    color: 'black'
                }}>Realworld Blog</Link>
        <div className={styles.buttonContainer}>
        <NavLink to='/sign-in' className={styles.link}>Sign In</NavLink>
        <NavLink to='/sign-up' className={styles.link}>Sign Up</NavLink>
        </div>
      </header> 
      <main>
      <Outlet/>
      </main>
       </>
     );
}
 
export default Header;
