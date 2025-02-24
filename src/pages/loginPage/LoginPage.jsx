import React from 'react';
import { Button, TextField } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import { Send } from '@mui/icons-material';
import { useState } from 'react';

import './index.scss';
import src from '../../assets/logo.png';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    };
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
                                    <TextField label='Email' type={'email'} />
                                    <TextField label='Пароль' type={'password'} />
                                </div>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    loading={isLoading}
                                    endIcon={<Send />}
                                >
                                    {'Войти'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
