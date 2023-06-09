import React from 'react';
import NavBar from '../components/NavBar';
import HomePageCards from '../components/HomePageCards';

const Home = () => {

  return (
    <div>
      <NavBar />
    <div className='home-page-cards'>
      <HomePageCards />
    </div>
    </div>
  )
};

export default Home;