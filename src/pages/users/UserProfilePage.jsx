import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button, TextField } from '@mui/material';

import './index.scss';
import RoleChip from '../../components/chip/RoleChip';
import EditModal from '../../components/modal/EditModal';

import { fetchConcreteUserJsonServer, fetchUserById } from '../../api/users/usersService';
import { getHighestRole } from '../../utils/userRight';
import Loader from '../../components/loader/Loader';

const UserProfilePage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [userRole, setRole] = useState('Студент');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await fetchUserById(id);
            setUser(await data.json());
            setRole(userRole);
        })();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setRole(getHighestRole(user.roles || []));
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <EditModal isOpen={open} handleClose={handleClose} user={user} />
            <div className='profile-page'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='inner-wrapper '>
                        <div className='img-wrapper'>
                            <PermIdentityIcon
                                sx={{ height: '100%', width: '100%', color: '#4b4b4b' }}
                            />
                            <RoleChip role={userRole} color={'info'} />
                        </div>
                        <div className='profile-info flex column-d'>
                            <h2>Данные пользователя</h2>
                            <div className='divider'></div>
                            <form action='' onSubmit={handleSubmit}>
                                <div className='input-wrapper'>
                                    <TextField
                                        sx={{ width: 1, marginBottom: '20px' }}
                                        value={user?.fullName}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                    <TextField
                                        type={'email'}
                                        sx={{ width: 1, marginBottom: '20px' }}
                                        value={user?.email}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                    {user.role === 'student' && (
                                        <TextField
                                            sx={{ width: 1, marginBottom: '20px' }}
                                            value={user?.group}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                    )}
                                    <Button
                                        variant='contained'
                                        type='button'
                                        sx={{
                                            width: 1,
                                            backgroundColor: '#ffbf03',
                                            color: '#000',
                                        }}
                                        onClick={() => {
                                            setOpen(true);
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserProfilePage;
