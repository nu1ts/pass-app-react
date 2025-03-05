import React from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Box } from '@mui/system';

import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';
import InfoChip from '../chip/InfoChip';
import DateInput from '../datePicker/DateInput';

export const AbsencesFilter = () => {
    const [groupNumber, setGroupNumber] = React.useState('');
    const [status, setStatus] = React.useState('all');
    const search = useInput('', {});
    const handleChange = (e) => {
        setStatus(e.target.value);
    };
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
                    <FormControl>
                        <InputLabel id='status-label'>Статус</InputLabel>
                        <Select
                            labelId='status-label'
                            value={status}
                            sx={{
                                minWidth: '120px',
                                marginRight: '10px',
                                height: '56px',
                                color: '#000',
                                backgroundColor: '#fff',
                            }}
                            label='Статус'
                            size='medium'
                            onChange={handleChange}
                        >
                            <MenuItem value={'all'}>
                                <InfoChip title='Все' color='default' />
                            </MenuItem>
                            <MenuItem value={'approved'}>
                                <InfoChip title='Одобрен' color='success' />
                            </MenuItem>
                            <MenuItem value={'rejected'}>
                                <InfoChip title='Отклонен' color='error' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label={'Группа'}
                        inputProps={{
                            maxLength: 6,
                            type: 'number',
                        }}
                        inputMode={'numeric'}
                        size='medium'
                        sx={{ width: '120px' }}
                        value={groupNumber}
                        onInput={(e) => {
                            let group = Math.max(0, parseInt(e.target.value))
                                .toString()
                                .slice(0, e.target.maxLength);
                            setGroupNumber(group);
                        }}
                    />
                    <Button
                        variant={'contained'}
                        size={'medium'}
                        sx={{
                            boxShadow: 'none',
                            textTransform: 'none',
                            marginLeft: '20px',
                            height: '56px',
                        }}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};

export const RequestFilters = () => {
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
                    <DateInput />
                    <TextField
                        label={'Группа'}
                        inputProps={{
                            maxLength: 6,
                            type: 'number',
                        }}
                        inputMode={'numeric'}
                        size='medium'
                        sx={{ width: '120px' }}
                        value={groupNumber}
                        onInput={(e) => {
                            let group = Math.max(0, parseInt(e.target.value))
                                .toString()
                                .slice(0, e.target.maxLength);
                            setGroupNumber(group);
                        }}
                    />

                    <Button
                        variant={'contained'}
                        size={'medium'}
                        sx={{
                            boxShadow: 'none',
                            textTransform: 'none',
                            marginLeft: '20px',
                            height: '56px',
                        }}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};
