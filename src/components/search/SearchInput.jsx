import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '25px',
    backgroundColor: '#edf4fe',

    transition: '0.2s ease-in-out',

    width: 'auto',
    marginLeft: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: '#4b4b4b',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.1 ease-in-out',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#4b4b4b',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '0px',
        transition: '0.2s ease-in-out',
        '&:focus': {
            width: '200px',
        },
        '&:hover': {
            width: '200px',
        },
    },
}));

export default function SearchInput({ value, onChange }) {
    return (
        <>
            <Search sx={{ width: 'auto', display: 'flex' }}>
                <SearchIconWrapper>
                    <SearchIcon sx={{ color: 'inherit' }} />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder='Найти…'
                    inputProps={{ 'aria-label': 'search' }}
                    value={value}
                    onChange={onChange}
                />
            </Search>
        </>
    );
}
