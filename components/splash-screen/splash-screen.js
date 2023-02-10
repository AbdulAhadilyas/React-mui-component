import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { logo2 } from '../../assets'

export default function SplashScreen() {
    return (
        <div style={{ position: 'relative' }}>
            <Skeleton
                variant="rectangular"
                width='100%'
                height='100vh'
            >
            </Skeleton>
            <Box
                component='div'
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <img src={logo2} alt="gama-ag.png" width="150px" />
            </Box>
        </div>
    )
}