import { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import { useInput } from '../../hooks/useInput';
import InfoChip from '../chip/InfoChip';
import SearchInput from '../search/SearchInput';
import DateInput from '../datePicker/DateInput';
import { setAbsencesHistoryFiltersParams } from '../../store/actions/filterAction';
import { setAbsencesFiltersParams } from '../../store/actions/filterAction';
import { fetchAbsences } from '../../store/actions/absencesAction';
import { getStringQuery } from '../../utils/converter/paramsConverter';
import { HISTORY } from '../../utils/constants/filterType';

export const HistoryFilters = () => {
    const { absencesHistoryFilters } = useSelector((state) => state.filters);
    const { historyAbsences } = useSelector((state) => state.absences);
    const [groupNumber, setGroupNumber] = useState(absencesHistoryFilters.group);
    const [status, setStatus] = useState(absencesHistoryFilters.status);
    const search = useInput('', {});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    const handleClick = () => {
        dispatch(
            setAbsencesHistoryFiltersParams({
                fullName: search.value || null,
                status: status,
                group: groupNumber || null,
                size: 5,
                page: 1,
            }),
        );
    };

    useEffect(() => {
        setGroupNumber(absencesHistoryFilters.group);
        setStatus(absencesHistoryFilters.status);
        search.setValue(absencesHistoryFilters.fullName);
    }, []);

    useEffect(() => {
        console.log(absencesHistoryFilters);
        dispatch(fetchAbsences(getStringQuery(absencesHistoryFilters, HISTORY)), HISTORY);
        console.log(historyAbsences);
    }, [absencesHistoryFilters]);

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
                            <MenuItem value={'Approved'}>
                                <InfoChip title='Одобрен' color='success' />
                            </MenuItem>
                            <MenuItem value={'Rejected'}>
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
                        onClick={handleClick}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};

export const AbsencesFilters = () => {
    const [groupNumber, setGroupNumber] = useState('');
    const [date, setDate] = useState(null);
    const search = useInput('', {});
    const dispatch = useDispatch();
    const { absencesFilters } = useSelector((state) => state.filters);

    const handleClick = () => {
        dispatch(
            setAbsencesFiltersParams({
                fullName: search.value || null,
                date: date || null,
                group: groupNumber || null,
                size: 5,
                page: 1,
            }),
        );
    };
    useEffect(() => {
        setGroupNumber(absencesFilters.group);
        setDate(absencesFilters.date);
        search.setValue(absencesFilters.fullName);
    }, []);

    useEffect(() => {
        console.log(absencesFilters);
    }, [absencesFilters]);

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
                    <DateInput date={date} setDate={setDate} />
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
                        onClick={handleClick}
                    >
                        Применить
                    </Button>
                </div>
            </Box>
        </>
    );
};
