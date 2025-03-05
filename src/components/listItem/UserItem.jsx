import React from 'react';
import { Chip, ListItem, Typography } from '@mui/material';

const UserItem = ({ props }) => {
    return (
        <div>
            <ListItem
                sx={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '15px 25px',
                    marginBottom: '4px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <div className='wrapper flex row-d align-items-center justify-content-sb'>
                    <Typography>Иван Иванович</Typography>
                    <Typography sx={{ fontWeight: '400' }}>email@example.com</Typography>
                </div>
                <Chip
                    size='small'
                    label='Открыть профиль'
                    color='primary'
                    variant='outlined'
                    sx={{ padding: '4px', cursor: 'pointer' }}
                />
            </ListItem>
        </div>
    );
};

export default UserItem;
