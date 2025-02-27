import React from 'react';
import { Chip } from '@mui/material';

const InfoChip = ({ title = '', color = 'info' }) => {
    return (
        <>
            <Chip
                sx={{
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    minWidth: '120px',
                    padding: '6px 0',
                    width: 'auto',
                    height: 'auto',
                }}
                size='small'
                label={title}
                color={color}
            />
        </>
    );
};

export default InfoChip;
