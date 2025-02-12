import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import avatar from '../assets/images/Rectangle1.png';
import './headerLoggedIn.css'
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
        <div className='main-header'>
     
        <header className="container">
        <Link to='/' style={{
            textDecoration: 'none', 
            color: 'black'
        }}>Realworld Blog</Link>
       <div className="button-container">
        <NavLink to='new-article' className='link link-sm'>Create Article</NavLink>
       <NavLink to='profile' className='link link-auth'>
       <div className="author-cont">
            <span className="name">{name}</span>
            <img className="avatar" src={image || avatar} alt="" />
        </div>
        </NavLink>
        <NavLink to='/' className='link logout' onClick={handleClick}>Log Out</NavLink>
       </div>
       </header> 
       <main>
       <Outlet/>
       </main>
     
        </div>
     );
}
 
export default HeaderLoggedIn;