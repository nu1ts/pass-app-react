import React from 'react';
import { Outlet } from 'react-router';
import './index.scss';
const HomePage = () => {
    return (
        <div>
            <section className='content'>
                <h2>
                    Добро пожаловать в систему управления и администрирования пропусками TSU.PASS
                </h2>
            </section>
        </div>
    );
};

export default HomePage;
