import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearSession } from '../../store/actions/authAction';
import './index.scss';

const HomePage = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuth) {
            dispatch(clearSession());
            navigate('/login');
        }
    }, []);
    return (
        <div>
            <section className='content'>
                <div className='background'>
                    <div className='greeting'>
                        <h2>
                            Добро пожаловать в систему управления и администрирования пропусками
                            TSU.PASS
                        </h2>
                    </div>
                    <div className='round'></div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
