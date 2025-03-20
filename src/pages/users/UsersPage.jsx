import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';

import './index.scss';
import UserItem from '../../components/listItem/UserItem';
import { useSelector } from 'react-redux';
import EmptyResult from '../../components/emptyResult/EmptyResult';
import Loader from '../../components/loader/Loader';
import { ToastContainer } from 'react-toastify';

const UsersPage = () => {
    const { users, isLoading } = useSelector((state) => state.users);

    return (
        <>
            <div className='users-page'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='inner-wrapper'>
                        <div className='users-wrapper'>
                            {users.length > 0 ? (
                                <List sx={{ width: 1, paddingX: '16px' }}>
                                    {users.map((item) => {
                                        return <UserItem {...item} />;
                                    })}
                                </List>
                            ) : (
                                <EmptyResult />
                            )}
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default UsersPage;
