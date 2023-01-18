import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='menu'>
        <Link className='menu-item' to='/'>Home</Link>
        <Link className='menu-item' to='/cars'>Search</Link>
        <Link className='menu-item' to='/edit-car/:id'>Edit</Link>
        <Link className='menu-item' to='/create-car'>Create</Link>
    </nav>
  )
}

export default NavBar;