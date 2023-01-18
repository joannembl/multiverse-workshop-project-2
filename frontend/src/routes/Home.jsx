import React from 'react';
import NavBar from '../components/NavBar';
import Logo from '../images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import HomePageCards from '../components/HomePageCards';

const Home = () => {

  return (
    <div>
    <div className='navigation'>
        <a href='/' ><img src={Logo} alt='Logo' /></a>
        <NavBar />
        <Link className='menu-item-user' to='/user/:id'><AccountCircleIcon fontSize="large" /></Link>
    </div>
    <div className='home-page-cards'>
      <HomePageCards />
    </div>
    </div>
  )
};

export default Home;