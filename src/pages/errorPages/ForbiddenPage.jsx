import React from 'react';
import { Button } from '@mui/material';
import './index.scss';
import { useNavigate } from 'react-router-dom';
const ForbiddenPage = () => {
    const navigate = useNavigate();
    const handleToHome = () => {
        navigate('/home');
    };
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className='error-page forbidden'>
                <div className='error-page__inner '>
                    <div className='inner__inner-head'>
                        <h1 className='forbidden'>403</h1>
                        <h3 className='forbidden'>Доступ запрещен</h3>
                    </div>
                    <div className='inner__inner-content'>
                        <span>У вас недостаточно прав для доступа к этой странице</span>
                        <Button
                            sx={{ marginTop: '20px' }}
                            variant='contained'
                            onClick={handleToHome}
                        >
                            На главную
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForbiddenPage;
