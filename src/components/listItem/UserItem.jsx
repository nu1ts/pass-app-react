import React from 'react';
import { Chip, ListItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router';

const UserItem = ({ id, fullName, email, role }) => {
    const navigate = useNavigate();
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
                    <Typography>{fullName}</Typography>
                    <Typography sx={{ fontWeight: '400' }}>{role}</Typography>
                </div>
                <Chip
                    size='small'
                    label='Открыть профиль'
                    color='primary'
                    variant='outlined'
                    sx={{ padding: '4px', cursor: 'pointer' }}
                    onClick={() => {
                        navigate(`${id}`);
                    }}
                />
            </ListItem>
        </div>
    );
};

export default UserItem;
