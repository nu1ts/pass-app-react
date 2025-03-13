import React from 'react';
import { Button } from '@mui/material';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const NotMatch = () => {
    const navigate = useNavigate();
    const handleToHome = () => {
        navigate('/home');
    };
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className='not-match-page'>
                <div className='not-match-page__inner'>
                    <div className='inner__inner-head'>
                        <h1>404</h1>
                        <h3>Страница не найдена</h3>
                    </div>
                    <div className='inner__inner-content'>
                        <span>Неправильно набран адрес либо такой страницы не существует</span>
                        <div className='inner__buttons-wrapper'>
                            <Button variant='outlined' onClick={handleGoBack}>
                                Назад
                            </Button>
                            <Button variant='contained' onClick={handleToHome}>
                                На главную
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotMatch;
