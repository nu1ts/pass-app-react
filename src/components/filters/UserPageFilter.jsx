import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersFilters } from '../../store/reducers/filterReducer';

const UserPageFilter = ({ selectedRole }) => {
    const [groupNumber, setGroupNumber] = React.useState('');
    const search = useInput('', {});
    const dispatch = useDispatch();
    const { usersFilters } = useSelector((state) => state.filters);

    const handleClick = () => {
        if (selectedRole === 'students') {
            dispatch(
                setUsersFilters({
                    fullName: search.value,
                    role: selectedRole,
                    group: groupNumber || null,
                    size: 5,
                    page: 1,
                }),
            );
        } else {
            dispatch(
                setUsersFilters({
                    fullName: search.value,
                    role: selectedRole,
                    group: null,
                    size: 5,
                    page: 1,
                }),
            );
        }
    };

    useEffect(() => {
        console.log(usersFilters);
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
                    {selectedRole === 'students' && (
                        <TextField
                            label={'Группа'}
                            inputProps={{
                                maxLength: 6,
                                type: 'number',
                            }}
                            size={'medium'}
                            inputMode={'numeric'}
                            sx={{ height: '56px', boxSizing: 'border-box', width: '120px' }}
                            value={groupNumber}
                            onInput={(e) => {
                                let group = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, e.target.maxLength);
                                setGroupNumber(group);
                            }}
                        />
                    )}
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
