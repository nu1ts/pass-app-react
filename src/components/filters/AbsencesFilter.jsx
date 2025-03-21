import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import InfoChip from '../chip/InfoChip';
import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';
import { setAbsencesHistoryFiltersParams } from '../../store/actions/filterAction';
import { setAbsencesFiltersParams } from '../../store/actions/filterAction';
import { fetchAbsences } from '../../store/actions/absencesAction';
import { getStringQuery } from '../../utils/converter/paramsConverter';
import { ABSENCES, HISTORY } from '../../utils/constants/filterType';

export const HistoryFilters = () => {
    const { absencesHistoryFilters } = useSelector((state) => state.filters);
    const { pagination } = useSelector((state) => state.absences);
    const [groupNumber, setGroupNumber] = useState(absencesHistoryFilters.group);
    const [status, setStatus] = useState(absencesHistoryFilters.status);
    const search = useInput('', {});
    const [checked, setChecked] = useState(false);
    const [type, setType] = useState('');
    const [sorting, setSorting] = useState('');

    const dispatch = useDispatch();
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSortChange = (e) => {
        setSorting(e.target.value);
    };

    const handleCheck = (event) => {
        setChecked((prev) => !prev);
    };
    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    const handleClick = () => {
        dispatch(
            setAbsencesHistoryFiltersParams({
                fullName: search.value || null,
                status: status,
                type: type,
                sorting: sorting,
                group: groupNumber || null,
                size: 10,
                page: 1,
                onlyMy: checked,
            }),
        );
    };
    useEffect(() => {
        dispatch(
            setAbsencesHistoryFiltersParams({
                fullName: search.value || null,
                status: status,
                type: type,
                group: groupNumber || null,
                sorting: sorting,
                size: 10,
                page: pagination.current,
                onlyMy: checked,
            }),
        );
    }, [pagination.current]);

    useEffect(() => {
        setGroupNumber(absencesHistoryFilters.group);
        setStatus(absencesHistoryFilters.status);
        search.setValue(absencesHistoryFilters.fullName);
        setType(absencesHistoryFilters.type);
        setSorting(absencesHistoryFilters.sorting);
    }, []);

    useEffect(() => {
        dispatch(fetchAbsences(getStringQuery(absencesHistoryFilters, HISTORY), HISTORY));
    }, [absencesHistoryFilters]);

    return (
        <>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    padding: '10px 20px',
                    margin: '0 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <div className='flex row-d align-items-center justify-content-sb w-100'>
                    <SearchInput
                        value={search.value}
                        onChange={(e) => {
                            search.onChange(e);
                        }}
                    />
                    <FormControlLabel
                        value={checked}
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleCheck}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label='Мои заявки'
                        labelPlacement='end'
                    />
                </div>
                <div className='flex row-d align-items-center justify-content-sb mt-20 w-100'>
                    <div className='flex row-d align-items-center'>
                        <TextField
                            label={'Группа'}
                            inputProps={{
                                maxLength: 6,
                                type: 'number',
                            }}
                            inputMode={'numeric'}
                            size='medium'
                            sx={{ width: '120px', marginRight: '10px' }}
                            value={groupNumber}
                            onInput={(e) => {
                                let group = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, e.target.maxLength);
                                setGroupNumber(isNaN(group) ? '' : group);
                            }}
                        />
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
                                <MenuItem value={'Approved'}>
                                    <InfoChip title='Одобрен' color='success' />
                                </MenuItem>
                                <MenuItem value={'Rejected'}>
                                    <InfoChip title='Отклонен' color='error' />
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id='status-label'>Тип заявки</InputLabel>
                            <Select
                                labelId='status-label'
                                value={type}
                                sx={{
                                    width: '100%',
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                    marginRight: '10px',
                                    height: '56px',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}
                                label='Тип заявки'
                                size='medium'
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'Sick'}>Больничный</MenuItem>
                                <MenuItem value={'Academic'}>Учебная</MenuItem>
                                <MenuItem value={'Family'}>Семейные обстоятельства</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id='status-label'>Сортировка</InputLabel>
                            <Select
                                labelId='status-label'
                                value={sorting}
                                sx={{
                                    width: '100%',
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                    marginRight: '10px',
                                    height: '56px',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}
                                label='Сортировка'
                                size='medium'
                                onChange={handleSortChange}
                            >
                                <MenuItem value={'CreateDesc'}>Новые</MenuItem>
                                <MenuItem value={'CreateAsc'}>Старые</MenuItem>
                                <MenuItem value={'UpdateDesc'}>Обновленные</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

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
    const [checked, setChecked] = useState(false);

    const [type, setType] = useState('');
    const [sorting, setSorting] = useState('');

    const search = useInput('', {});
    const dispatch = useDispatch();
    const { absencesFilters } = useSelector((state) => state.filters);
    const { pagination } = useSelector((state) => state.absences);

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSortChange = (e) => {
        setSorting(e.target.value);
    };

    const handleCheck = (event) => {
        setChecked((prev) => !prev);
    };

    const handleClick = () => {
        dispatch(
            setAbsencesFiltersParams({
                fullName: search.value || null,
                status: 'Pending',
                group: groupNumber || null,
                type: type || null,
                sorting: null,
                size: 10,
                page: 1,
                onlyMy: checked,
            }),
        );
    };
    useEffect(() => {
        setGroupNumber(absencesFilters.group);
        search.setValue(absencesFilters.fullName);
    }, []);

    useEffect(() => {
        dispatch(
            setAbsencesFiltersParams({
                fullName: search.value || null,
                status: 'Pending',
                group: groupNumber || null,
                type: type || null,
                sorting: null,
                size: 10,
                page: pagination.current,
                onlyMy: checked,
            }),
        );
    }, [pagination.current]);
    useEffect(() => {
        dispatch(fetchAbsences(getStringQuery(absencesFilters, ABSENCES), ABSENCES));
    }, [absencesFilters]);

    return (
        <>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    padding: '10px 20px',
                    margin: '0 20px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <div className='flex row-d align-items-center justify-content-sb w-100'>
                    <SearchInput
                        value={search.value}
                        onChange={(e) => {
                            search.onChange(e);
                        }}
                    />
                    <FormControlLabel
                        value={checked}
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleCheck}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label='Мои заявки'
                        labelPlacement='end'
                    />
                </div>
                <div className='flex row-d align-items-center justify-content-sb mt-20 w-100'>
                    <div className='flex row-d align-items-center'>
                        <FormControl>
                            <InputLabel id='status-label'>Тип заявки</InputLabel>
                            <Select
                                labelId='status-label'
                                value={type}
                                sx={{
                                    width: '100%',
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                    marginRight: '10px',
                                    height: '56px',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}
                                label='Тип заявки'
                                size='medium'
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'Sick'}>Больничный</MenuItem>
                                <MenuItem value={'Academic'}>Учебная</MenuItem>
                                <MenuItem value={'Family'}>Семейные обстоятельства</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id='status-label'>Сортировка</InputLabel>
                            <Select
                                labelId='status-label'
                                value={sorting}
                                sx={{
                                    width: '100%',
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                    marginRight: '10px',
                                    height: '56px',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}
                                label='Сортировка'
                                size='medium'
                                onChange={handleSortChange}
                            >
                                <MenuItem value={'CreateDesc'}>Новые</MenuItem>
                                <MenuItem value={'CreateAsc'}>Старые</MenuItem>
                                <MenuItem value={'UpdateDesc'}>Обновленные</MenuItem>
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
                                setGroupNumber(isNaN(group) ? '' : group);
                            }}
                        />
                    </div>

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
