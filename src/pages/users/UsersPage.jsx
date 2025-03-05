import React from 'react';
import { List } from '@mui/material';

import './index.scss';
import UserItem from '../../components/listItem/UserItem';
import { users } from '../../utils/fakeDB';

const UsersPage = () => {
    return (
        <>
            <div className='users-page'>
                <div className='inner-wrapper'>
                    <div className='users-wrapper'>
                        <List sx={{ width: 1, paddingX: '16px' }}>
                            {users.map((item) => {
                                return <UserItem {...item} />;
                            })}
                        </List>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersPage;
