import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/actions/usersAction';

export default function UserSelect({ value, setValue }) {
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <Autocomplete
            multiple
            limitTags={2}
            options={users}
            getOptionLabel={(option) => option.fullName}
            value={value}
            onChange={(e, newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} label='Пользователи' />}
            sx={{
                width: '100%',

                maxWidth: '524px',
                margin: '0 0 20px 0',
            }}
            slotProps={{ chip: { color: 'primary' } }}
        />
    );
}
