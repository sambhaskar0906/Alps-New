import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                py: 2,
                mt: 4,
                borderTop: '1px solid #ddd',
                backgroundColor: '#f8f8f8',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} Alps Insurance Company. All rights reserved.
            </Typography>
            <Typography variant="caption" color="textSecondary">
                Designed by Satyam Ray
            </Typography>
        </Box>
    );
};

export default Footer;
