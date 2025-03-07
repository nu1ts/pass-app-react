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
                    </div>
                    <div className='round'></div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
