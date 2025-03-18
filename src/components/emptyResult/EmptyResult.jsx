import React from 'react';
import './index.scss';
const EmptyResult = () => {
    return (
        <>
            <div className='empty-container'>
                <span>{'Ничего не найдено'}</span>
            </div>
        </>
    );
};

export default EmptyResult;
