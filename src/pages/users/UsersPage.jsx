import { Chip, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import SearchInput from '../../components/search/SearchInput';
import { useInput } from '../../hooks/useInput';

import './index.scss';

const UsersPage = () => {
    const search = useInput('', {});
    return (
        <>
            <div className='users-page'>
                <div className='inner-wrapper'>
                    <div className='users-wrapper'>
                        <List sx={{ width: 1 }}>
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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>

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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>
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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>
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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>
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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>
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
                                    <Typography sx={{ fontWeight: '400' }}>
                                        email@example.com
                                    </Typography>
                                </div>
                                <Chip
                                    size='small'
                                    label='Открыть профиль'
                                    color='primary'
                                    variant='outlined'
                                    sx={{ padding: '4px', cursor: 'pointer' }}
                                />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersPage;
