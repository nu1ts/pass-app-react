import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useState } from 'react';

import './index.scss';
import src from '../../assets/logo.png';
import { useInput } from '../../hooks/useInput';
import { loginUserJsonServer } from '../../api/account/accountService';
import { ErrorToast, SuccessToast } from '../../utils/notifications/notifications';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../../store/actions/profileAction';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const emailInput = useInput('', { isEmailValid: true, isEmpty: true });
    const passwordInput = useInput('', { isEmpty: true, minLength: 8 });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidForm) {
            setIsLoading(true);
            let users = await loginUserJsonServer();
            if (users) {
                let result = users.find((user) => {
                    return user.email === emailInput.value && user.password === passwordInput.value;
                });
                if (result) {
                    SuccessToast('Добро пожаловать');
                    dispatch(
                        fetchProfile({
                            fullName: result.fullName,
                            email: result.email,
                            role: result.role,
                        }),
                    );
                    navigate('/');
                } else {
                    ErrorToast('Неверный логин или пароль');
                }
            } else {
                ErrorToast('Ошибка сервера');
            }
        }
        setIsLoading(false);
    };

    const handleForm = () => {
        if (emailInput.emailError || passwordInput.minLengthError) {
            setIsValidForm(false);
        } else if (emailInput.isEmptyError || passwordInput.isEmptyError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    useEffect(() => {
        handleForm();
    }, [emailInput.emailError, passwordInput.minLengthError]);

    return (
        <div>
            <section className='content'>
                <div className='login-page'>
                    <div className='login-page__login-background'>
                        <div className='login-page__inner-wrapper'>
                            <div className='app-logo'>
                                <img src={src} alt='logo' width={74} height={78} />
                                <h2>TSU.PASS</h2>
                            </div>
                            <form
                                action=''
                                className='login-page__login-form'
                                onSubmit={handleSubmit}
                            >
                                <div className='login-form__header'>
                                    <h2>Авторизация</h2>
                                </div>
                                <div className='login-form__input-wrapper'>
                                    <TextField
                                        label={emailInput.emailError ? 'Невалидный email' : 'Email'}
                                        type={'email'}
                                        value={emailInput.value}
                                        onChange={(e) => {
                                            emailInput.onChange(e);
                                        }}
                                        error={emailInput.emailError}
                                    />
                                    <TextField
                                        label={
                                            passwordInput.minLengthError
                                                ? `Введите ещё ${8 - passwordInput.value.length} символа`
                                                : 'Пароль'
                                        }
                                        type={'password'}
                                        value={passwordInput.value}
                                        onChange={(e) => {
                                            passwordInput.onChange(e);
                                        }}
                                        error={passwordInput.minLengthError}
                                    />
                                </div>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    loading={isLoading}
                                    endIcon={<Send />}
                                    disabled={!isValidForm}
                                >
                                    {'Войти'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer limit={1} />
            </section>
        </div>
    );
};

export default LoginPage;
