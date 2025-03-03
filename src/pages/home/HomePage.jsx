import React from 'react';
import { Outlet } from 'react-router';

const HomePage = () => {
    return (
        <div>
            <section className='content'>
                <h2>
                    Добро пожаловать в систему управления и администрирования пропусами TSU.PASS
                </h2>
            </section>
        </div>
    );
};

export default HomePage;
