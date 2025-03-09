import React from 'react';
import DateInput from '../../components/datePicker/DateInput';
import { useState, useEffect } from 'react';

import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
} from '@mui/material';

const CreateAbsence = () => {
    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };
    const handleChange = (e) => {
        setStatus(e.target.value);
    };
    const handleForm = () => {};

    useEffect(() => {
        handleForm();
    }, []);
    return (
        <>
            <div className='absences-page'>
                <div className='flex column-d align-items-center'>
                    <form className='absence-create-form' action=''>
                        <h1>Форма создания заявки</h1>
                        <div className='date-inputs-wrapper'>
                            <DateInput
                                sx={{
                                    width: '49%',
                                    boxSizing: 'border-box',
                                }}
                                date={firstDate}
                                setDate={setFirstDate}
                                label={'Начало'}
                            />
                            <DateInput
                                sx={{
                                    width: '49%',
                                    boxSizing: 'border-box',
                                }}
                                date={secondDate}
                                setDate={setSecondDate}
                                label={'Конец'}
                            />
                        </div>
                        <div className='date-inputs-wrapper'>
                            <FormControl>
                                <InputLabel id='status-label'>Тип заявки</InputLabel>
                                <Select
                                    labelId='status-label'
                                    value={status}
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
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'all'}>Больничный</MenuItem>
                                    <MenuItem value={'Approved'}>Семейные обстоятельства</MenuItem>
                                    <MenuItem value={'Rejected'}>Учебная</MenuItem>
                                    <MenuItem value={'Rejected'}>Иная</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateAbsence;
