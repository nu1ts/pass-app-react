import React from 'react';
import { Chip } from '@mui/material';

const InfoChip = ({ title = '', color = 'info' }) => {
    return (
        <>
            <Chip
                sx={{
                    borderRadius: '8px',
                    border: '1px solid',
                    boxSizing: 'border-box',
                    minWidth: '90px',
                    padding: '6px 4px ',
                    width: 'auto',
                    height: 'auto',
                    fontWeight: '600',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                }}
                size='small'
                label={title}
                color={color}
                variant={'outlined'}
            />
        </>
    );
};

export default InfoChip;
