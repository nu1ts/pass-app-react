import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';

const UserPageFilter = ({ selectedRole }) => {
    const [groupNumber, setGroupNumber] = React.useState('');
    const search = useInput('', {});
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
                            label={'Номер группы'}
                            inputProps={{
                                maxLength: 6,
                                type: 'number',
                            }}
                            size={'small'}
                            inputMode={'numeric'}
                            sx={{ height: '40px', boxSizing: 'border-box' }}
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
                            height: '40px',
                        }}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};

export default UserPageFilter;
