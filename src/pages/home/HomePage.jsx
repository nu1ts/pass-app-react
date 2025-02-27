import React from 'react';
import { Outlet } from 'react-router';

const HomePage = () => {
    return (
        <div>
            <section className='content'>
                <h2>Welcome home!</h2>
                <Outlet />
            </section>
        </div>
    );
};

export default HomePage;
