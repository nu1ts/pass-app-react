import React from 'react';
import DateInput from '../../components/datePicker/DateInput';
import { useState, useEffect } from 'react';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
} from '@mui/material';
import InputFile from '../../components/input/InputFile';
import { dateAreValid, endDateValid } from '../../utils/dateValidation';

const CreateAbsence = () => {
    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('');
    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isDateError, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };
    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    const handleChange = (e) => {
        setType(e.target.value);
    };
    const handleForm = () => {
        if (endDateValid(secondDate) && dateAreValid(firstDate, secondDate)) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    };

    useEffect(() => {
        handleForm();
    }, [firstDate, secondDate]);

    return (
        <>
            <div className='absences-page'>
                <div className='flex column-d align-items-center'>
                    <form className='absence-create-form' action=''>
                        <h1>Форма создания заявки</h1>
                        {type !== 'Family' && (
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
                        )}
                        <div className='date-inputs-wrapper'>
                            <FormControl>
                                <InputLabel id='status-label'>Тип заявки</InputLabel>
                                <Select
                                    labelId='status-label'
                                    value={type}
                                    sx={{
                                        width: '100%',
                                        minWidth: '300px',
                                        maxWidth: '300px',
                                        marginRight: '10px',
                                        height: '56px',
                                        color: '#000',
                                        backgroundColor: '#fff',
                                    }}
                                    label='Тип заявки'
                                    size='medium'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Sick'}>Больничный</MenuItem>
                                    <MenuItem value={'Academic'}>Учебная</MenuItem>
                                    <MenuItem value={'Family'}>Семейные обстоятельства</MenuItem>
                                </Select>
                            </FormControl>
                            {type === 'Family' && (
                                <FormControlLabel
                                    value={checked}
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label='Заявление в деканат'
                                    labelPlacement='end'
                                />
                            )}
                        </div>
                        <div className='files-container'>
                            {type === 'Family' && checked ? <></> : <InputFile />}
                        </div>
                        <Button
                            variant='contained'
                            sx={{ width: 1, margin: 0 }}
                            disabled={!isValidForm}
                        >
                            Отправить
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateAbsence;
