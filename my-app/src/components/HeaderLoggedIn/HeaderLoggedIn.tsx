import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import avatar from '../assets/images/Rectangle1.png';
import styles from './headerLoggedIn.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootSt } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import Loading from '../Loading/Loading';
const HeaderLoggedIn: React.FC = () => {
    const name = useSelector((state: RootSt) => state.auth.username);
    const image = useSelector((state: RootSt) => state.auth.image);
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = () => {
        dispatch(logout());
    }
    const loading = useSelector((state: RootSt) => state.auth.loading)
         if(loading){
           return <Loading />
         }
    return ( 
        <div className={styles.main}>
     
        <header className={styles.container}>
        <Link to='/' style={{
            textDecoration: 'none', 
            color: 'black'
        }}>Realworld Blog</Link>
       <div className={styles.buttonContainer}>
        <NavLink to='new-article' className={`${styles.link} ${styles.linkSm}`}>Create Article</NavLink>
       <NavLink to='profile' className={`${styles.link} ${styles.linkAuth}`}>
       <div className={styles.authorCont}>
            <span className={styles.name}>{name}</span>
            <img className={styles.avatar} src={image || avatar} alt="" />
        </div>
        </NavLink>
        <NavLink to='/' className={`${styles.link} ${styles.logout}`} onClick={handleClick}>Log Out</NavLink>
       </div>
       </header> 
       <main>
       <Outlet/>
       </main>
     
        </div>
     );
}
 
export default HeaderLoggedIn;