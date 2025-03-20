import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';
import src from '../../assets/logo.png';
import { useInput } from '../../hooks/useInput';
import { loginUser } from '../../api/account/accountService';
import { ErrorToast, SuccessToast } from '../../utils/notifications/notifications';
import { clearSession, setAuth } from '../../store/actions/authAction';
import { setUserRoles } from '../../store/actions/rolesAction';
import { isTeacher, isDean } from '../../utils/userRight';
import { ERROR_403, LOGIN_ERROR } from '../../utils/constants/errorCode';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const emailInput = useInput('', { isEmailValid: true, isEmpty: true });
    const passwordInput = useInput('', { isEmpty: true, minLength: 8 });
    const { roles } = useSelector((state) => state.roles);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setSession = async (token) => {
        dispatch(setAuth(token));
        dispatch(setUserRoles());
    };

    const checkRights = async (roles) => {
        if (token && (isTeacher(roles) || isDean(roles))) {
            SuccessToast('Добро пожаловать');
            return navigate('/');
        } else {
            dispatch(clearSession());
            return ErrorToast(ERROR_403);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidForm) {
            setIsLoading(true);
            let response = await loginUser({
                email: emailInput.value,
                password: passwordInput.value,
            });
            if (response.ok) {
                const token = await response.json();
                await setSession(token.token);
            } else {
                if (response.status === 400) {
                    ErrorToast(LOGIN_ERROR);
                }
            }
            setIsLoading(false);
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
        dispatch(clearSession());
    }, []);

    useEffect(() => {
        handleForm();
    }, [emailInput.emailError, passwordInput.minLengthError]);

    useEffect(() => {
        if (roles.length > 0) {
            checkRights(roles);
        }
    }, [roles]);
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
