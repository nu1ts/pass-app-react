import React from 'react';

const EmptyResult = (text = 'Ничего не найдено') => {
    return (
        <>
            <div className='empty-container'>
                <span>{text}</span>
            </div>
        </>
    );
};

export default EmptyResult;
