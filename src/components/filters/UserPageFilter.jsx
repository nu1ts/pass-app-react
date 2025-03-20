import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersFilters } from '../../store/reducers/filterReducer';
import { getStringQuery } from '../../utils/converter/paramsConverter';
import { USERS } from '../../utils/constants/filterType';
import { fetchUsers } from '../../store/actions/usersAction';

const UserPageFilter = ({ selectedRole }) => {
    const [groupNumber, setGroupNumber] = useState('');
    const search = useInput('', {});
    const { usersFilters } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (selectedRole === 'Student') {
            dispatch(
                setUsersFilters({
                    fullName: search.value || null,
                    role: selectedRole,
                    group: groupNumber || null,
                    size: 5,
                    page: 1,
                }),
            );
        } else {
            dispatch(
                setUsersFilters({
                    fullName: search.value || null,
                    role: selectedRole,
                    group: null,
                    size: 5,
                    page: 1,
                }),
            );
        }
    };

    useEffect(() => {
        dispatch(
            setUsersFilters({
                fullName: '',
                role: selectedRole,
                group: null,
                size: 5,
                page: 1,
            }),
        );
        search.setValue('');
    }, [selectedRole]);

    useEffect(() => {
        dispatch(fetchUsers(getStringQuery(usersFilters, USERS)));
    }, [usersFilters]);

    return (
        <>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    padding: '10px 20px',
                    margin: '0 20px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <SearchInput
                    value={search.value}
                    onChange={(e) => {
                        search.onChange(e);
                    }}
                />
                <div className='flex row-d align-items-center justify-content-sb'>
                    <Button
                        variant={'contained'}
                        sx={{
                            boxShadow: 'none',
                            textTransform: 'none',
                            marginLeft: '20px',
                            height: '56px',
                        }}
                        onClick={handleClick}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};

export default UserPageFilter;
