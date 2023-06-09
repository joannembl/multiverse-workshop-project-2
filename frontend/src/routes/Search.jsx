import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const Search = () => {
  const [cars, setCars] = useState([]);

  const getData = async () => {
    const response = await fetch(`http://localhost:4000/cars`);
    const data = await response.json();

    console.log('Data: ', data);
    const { cars } = data;
    setCars(cars);
    console.log('Users: ', cars);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
        <NavBar />
    </div>
  )
}

export default Search;