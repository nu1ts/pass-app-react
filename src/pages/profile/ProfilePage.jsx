import React from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import './index.scss';
import { TextField } from '@mui/material';
import { useInput } from '../../hooks/useInput';

const ProfilePage = () => {
    const email = useInput('', { isEmailValid: true });
    const fullName = useInput('', { isEmpty: true });
    return (
        <div>
            <div className='profile-page'>
                <div className='inner-wrapper '>
                    <div className='img-wrapper'>
                        <PermIdentityIcon
                            sx={{ height: '100%', width: '100%', color: '#4b4b4b' }}
                        />
                        <div className='role-span flex-centered'>
                            <span>{'Декан'}</span>
                        </div>
                    </div>
                    <div className='profile-info flex column-d'>
                        <h2>Данные пользователя</h2>
                        <div className='divider'></div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
