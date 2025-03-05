import React, { useState, useEffect } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button, TextField } from '@mui/material';

import './index.scss';
import { useInput } from '../../hooks/useInput';
import RoleChip from '../../components/chip/RoleChip';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const email = useInput('', { isEmailValid: true, isEmpty: true });
    const fullName = useInput('', { isEmpty: true });
    const { profile } = useSelector((state) => state.profile);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('asdsa');
        setIsLoading(true);
    };

    const handleForm = () => {
        if (email.isEmptyError || fullName.isEmptyError || email.emailError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };
    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value]);
    return (
        <div>
            <div className='profile-page'>
                <div className='inner-wrapper '>
                    <div className='img-wrapper'>
                        <PermIdentityIcon
                            sx={{ height: '100%', width: '100%', color: '#4b4b4b' }}
                        />
                        <RoleChip role='Декан' color={'info'} />
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
                                <Button
                                    variant='contained'
                                    type='submit'
                                    sx={{
                                        width: 1,
                                        marginTop: '20px',
                                        backgroundColor: '#ffbf03',
                                        color: '#000',
                                    }}
                                    loading={isLoading}
                                    disabled={!isValidForm}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
