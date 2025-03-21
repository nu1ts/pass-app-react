import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button, TextField } from '@mui/material';

import './index.scss';
import RoleChip from '../../components/chip/RoleChip';
import EditModal from '../../components/modal/EditModal';

import {
    deleteUserById,
    fetchConcreteUserJsonServer,
    fetchUserById,
} from '../../api/users/usersService';
import { getHighestRole } from '../../utils/userRight';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/actions/authAction';
import { ErrorToast, WarningToast } from '../../utils/notifications/notifications';
import { CLIENT_ERROR, ERROR_401, SERVER_ERROR } from '../../utils/constants/errorCode';
import { ToastContainer } from 'react-toastify';

const UserProfilePage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [userRole, setRole] = useState('Студент');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    useEffect(() => {
        (async () => {
            const response = await fetchUserById(id);
            if (response) {
                if (response.ok) {
                    setUser(await response.json());
                    setRole(userRole);
                    setIsLoading(false);
                } else {
                    if (response.status === 401) {
                        await dispatch(clearSession());
                        await navigate('/login');
                    }
                    if (response.status === 403) {
                        navigate('/forbidden');
                    }
                    if (response.status >= 500) {
                        return ErrorToast(SERVER_ERROR);
                    }
                }
            } else {
                ErrorToast(CLIENT_ERROR);
            }
        })();
    }, []);

    useEffect(() => {
        setRole(getHighestRole(user.roles || []));
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        const response = await deleteUserById(id);
        if (response.ok) {
            navigate(-1);
        } else {
            if (response.status === 401) {
                return WarningToast(ERROR_401);
            }
            if (response.status === 403) {
                return navigate('/forbidden');
            }
            if (response.status >= 500) {
                return ErrorToast(SERVER_ERROR);
            }
        }
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
                                    {user.roles.includes('Student') && (
                                        <TextField
                                            sx={{ width: 1, marginBottom: '20px' }}
                                            value={user?.groupId}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                    )}
                                    <div className='flex row-d align-items-center justify-content-sb'>
                                        <Button
                                            variant='contained'
                                            type='button'
                                            sx={{
                                                width: '49%',
                                                backgroundColor: '#ffbf03',
                                                color: '#000',
                                            }}
                                            onClick={() => {
                                                setOpen(true);
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button
                                            variant='contained'
                                            type='button'
                                            color='error'
                                            sx={{
                                                width: '49%',
                                                color: '#fff',
                                            }}
                                            onClick={handleDelete}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default UserProfilePage;
