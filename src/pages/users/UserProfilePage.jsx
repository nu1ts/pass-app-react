import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button, TextField } from '@mui/material';

import './index.scss';
import { useInput } from '../../hooks/useInput';
import RoleChip from '../../components/chip/RoleChip';
import { users } from '../../utils/fakeDB';

const UserProfilePage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const [user, setUser] = useState({});
    const [role, setRole] = useState(user?.role);
    const email = useInput(user?.email, { isEmailValid: true, isEmpty: true });
    const fullName = useInput(user?.fullName, { isEmpty: true });

    const handleSubmit = (e) => {
        e.preventDefault();
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
        setIsLoading(true);
        setUser(users.find((item) => Number(item.id) === Number(id)));
    }, []);
    useEffect(() => {
        setIsLoading(false);
        email.setValue(user.email);
        fullName.setValue(user.fullName);
        setRole(user.role);
    }, [user]);
    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value]);
    return (
        <>
            <div className='profile-page'>
                <div className='inner-wrapper '>
                    <div className='img-wrapper'>
                        <PermIdentityIcon
                            sx={{ height: '100%', width: '100%', color: '#4b4b4b' }}
                        />
                        <RoleChip role={role} color={'info'} />
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
        </>
    );
};

export default UserProfilePage;
