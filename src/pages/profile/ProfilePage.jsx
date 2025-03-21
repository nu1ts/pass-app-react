import React, { useState, useEffect, useDebugValue } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button, TextField } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import './index.scss';
import Fab from '@mui/material/Fab';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useInput } from '../../hooks/useInput';
import RoleChip from '../../components/chip/RoleChip';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../api/account/accountService';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../../store/actions/authAction';
import { ErrorToast } from '../../utils/notifications/notifications';
import { CLIENT_ERROR, SERVER_ERROR } from '../../utils/constants/errorCode';
import Loader from '../../components/loader/Loader';
import { getHighestRole } from '../../utils/userRight';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const { roles } = useSelector((state) => state.roles);
    const [userRole, setRole] = useState('');
    const email = useInput('', { isEmailValid: true, isEmpty: true });
    const fullName = useInput('', { isEmpty: true });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    const loadProfile = async () => {
        setIsLoading(true);
        const response = await fetchUserProfile();
        if (response && response.ok) {
            setProfile(await response.json());
            setIsLoading(false);
        } else {
            if (response?.status === 401) {
                dispatch(clearSession());
                return navigate('/login');
            }
            if (response?.status === 403) {
                return navigate('/forbidden');
            }
            return ErrorToast(CLIENT_ERROR);
        }
    };

    const handleForm = () => {
        if (email.isEmptyError || fullName.isEmptyError || email.emailError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    useEffect(() => {
        loadProfile();
        setRole(getHighestRole(roles || []));
    }, []);

    useEffect(() => {
        email.setValue(profile.email);
        fullName.setValue(profile.fullName);
    }, [profile]);

    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value]);

    return (
        <div>
            <div className='profile-page'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
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
                                            label={'ФИО'}
                                            sx={{ width: 1, marginBottom: '20px' }}
                                            value={fullName.value}
                                            onChange={(e) => {
                                                fullName.onChange(e);
                                            }}
                                        />
                                        <TextField
                                            label={email.emailError ? 'Невалидный email' : 'Email'}
                                            type={'email'}
                                            sx={{ width: 1 }}
                                            value={email.value}
                                            onChange={(e) => {
                                                email.onChange(e);
                                            }}
                                            error={email.emailError}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {roles.includes('Student') && (
                            <div className='absolute'>
                                <Fab
                                    sx={{ width: '70px', height: '70px' }}
                                    color='primary'
                                    onClick={() => {
                                        navigate('/absences/create');
                                    }}
                                >
                                    <EditNoteIcon />
                                </Fab>
                            </div>
                        )}
                    </>
                )}
            </div>
            <ToastContainer limit={1} />
        </div>
    );
};

export default ProfilePage;
