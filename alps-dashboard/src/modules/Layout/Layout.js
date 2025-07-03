import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4, minHeight: '80vh' }}>
                <Outlet />
            </Container>
            <Box sx={{ mt: 4 }}>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
