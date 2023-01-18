import { Card, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { Link } from 'react-router-dom';

const HomePageCards = () => {
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
            <Card sx={{ minWidth: 250, mx: 5, height: 250 }}>
            <Typography className='home-page-card'>
                <Link className='home-page-card-titles' to='/cars'>
                <SearchIcon fontSize="large"/>
                    Car Search
                </Link>
                <ul>
                    <li>View all Cars</li>
                    <li>Search by Make</li>
                </ul>
            </Typography>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card sx={{ minWidth: 250, mx: 5, height: 250 }}>
            <Typography className='home-page-card'>
                <Link className='home-page-card-titles' to='/edit-car/:id'>
                <CreateIcon fontSize="large"/>
                    Edit Car
                </Link>
                <ul>
                    <li>Edit Car information</li>
                </ul>
            </Typography>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card sx={{ minWidth: 250, mx: 5, height: 250 }}>
            <Typography className='home-page-card'>
                <Link className='home-page-card-titles' to='/create-car'>
                <AddIcon fontSize="large"/>
                    Create Car
                </Link>
                <ul>
                    <li>Create new Car card</li>
                </ul>
            </Typography>
            </Card>
        </Grid>
    </Grid>
  )
}

export default HomePageCards;