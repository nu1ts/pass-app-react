import React from 'react';
import { Button } from '@mui/material';
import './index.scss';

const NotMatch = () => {
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
                            <Button variant='outlined'>Назад</Button>
                            <Button variant='contained'>На главную</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotMatch;
