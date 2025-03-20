import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <>
            <Box sx={{ width: 1, height: 1 }}>
                <CircularProgress
                    sx={{
                        marginTop: '128px',
                        display: 'flex',
                        alignSelf: 'center',
                        justifySelf: 'center',
                    }}
                    size={64}
                />
            </Box>
        </>
    );
};

export default Loader;
