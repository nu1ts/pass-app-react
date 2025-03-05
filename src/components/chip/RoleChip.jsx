import React from 'react';
import { Chip } from '@mui/material';

const RoleChip = ({ role = '', color = 'default' }) => {
    return (
        <>
            <Chip
                sx={{
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    minWidth: '120px',
                    padding: '6px 0',
                    width: 'auto',
                    height: 'auto',
                    fontSize: '16px',
                    fontWeight: '500',
                }}
                className={'role-chip'}
                size='small'
                label={role}
                color={color}
            />
        </>
    );
};

export default RoleChip;
