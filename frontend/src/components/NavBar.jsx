import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <div className='navigation'>
    <a href='/' ><img src={Logo} alt='Logo' /></a>
    <nav className='menu'>
        <Link className='menu-item' to='/'>Home</Link>
        <Link className='menu-item' to='/cars'>Search</Link>
        <Link className='menu-item' to='/edit-car/:id'>Edit</Link>
        <Link className='menu-item' to='/create-car'>Create</Link>
    </nav>
    <Link className='menu-item-user' to='/login'><AccountCircleIcon fontSize="large" /></Link>
    </div>
  )
}

export default NavBar;