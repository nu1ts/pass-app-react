import React from 'react';
import './index.scss';

const HomePage = () => {
    return (
        <div>
            <section className='content'>
                <div className='background'>
                    <div className='greeting'>
                        <h2>
                            Добро пожаловать в систему управления и администрирования пропусками
                            TSU.PASS
                        </h2>
                        <div className='round top-left'></div>
                        <div className='round bottom-right l-size'></div>
                    </div>
                    <div className='round'></div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
