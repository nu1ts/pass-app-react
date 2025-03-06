import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: '#edf4fe',
    display: 'flex',
    marginLeft: 0,
    maxWidth: '400px',
    width: '100%',
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#4b4b4b',
    width: '100%',
    height: '56px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

export default function SearchInput({ value, onChange }) {
    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon sx={{ color: 'inherit' }} />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Найти…' value={value} onChange={onChange} />
            </Search>
        </>
    );
}
