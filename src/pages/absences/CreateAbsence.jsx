import React from 'react';
import DateInput from '../../components/datePicker/DateInput';
import { useState, useEffect } from 'react';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { List } from '@mui/material';
import { Add } from '@mui/icons-material';
import FileItem from '../../components/input/FileItem';
import './index.scss';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
} from '@mui/material';

import { dateAreValid, endDateValid } from '../../utils/dateValidation';
import { createAbsence } from '../../api/absences/absencesService';
import { ErrorToast, SuccessToast } from '../../utils/notifications/notifications';
import { ERROR_400, ERROR_401, SERVER_ERROR } from '../../utils/constants/errorCode';
import { ToastContainer } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateAbsence = () => {
    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('');
    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isDateError, setError] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = React.useState([]);

    const handleFilesChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles((prev) => {
                return [...prev, ...e.target.files];
            });
        }

        setFiles((prev) => [...prev]);
        return (e.target.value = null);
    };

    React.useEffect(() => {
        setDocuments(files);
    }, [files]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let formData = new FormData();
        formData.append('Type', type);
        formData.append('StartDate', checked ? '' : firstDate);
        formData.append('EndDate', checked ? '' : secondDate);
        formData.append('DeclarationToDean', checked);
        if (documents) {
            formData.append('Documents', documents);
        }
        const response = await createAbsence(formData);
        if (response.ok) {
            return SuccessToast('Заявка отправлена');
        } else {
            if (response.status === 400) {
                ErrorToast(ERROR_400);
            }
            if (response.status === 401) {
                ErrorToast(ERROR_401);
            }
            if (response.status >= 500) {
                ErrorToast(SERVER_ERROR);
            }
        }
    };
    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    const handleChange = (e) => {
        setType(e.target.value);
    };
    const handleForm = () => {
        if (type === 'Family' && checked) {
            return setIsValidForm(true);
        } else if (type === 'Family' && !checked) {
            return setIsValidForm(documents.length !== 0);
        } else {
            setChecked(false);
            return setIsValidForm(
                dateAreValid(firstDate, secondDate) && type && documents.length !== 0,
            );
        }
    };

    useEffect(() => {
        handleForm();
    }, [firstDate, secondDate, checked, type, documents]);

    return (
        <>
            <div className='absences-page'>
                <div className='flex column-d align-items-center'>
                    <form className='absence-create-form' action='' onSubmit={handleSubmit}>
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
                            {type === 'Family' && checked ? (
                                <></>
                            ) : (
                                <>
                                    {files.length ? (
                                        <List className='files-list'>
                                            {files.map((file, index) => {
                                                return (
                                                    <FileItem
                                                        fileName={file.name}
                                                        id={index}
                                                        setFile={setFiles}
                                                    />
                                                );
                                            })}
                                        </List>
                                    ) : (
                                        <div className='inner-info'>
                                            {'Прикрепите файлы'}
                                            {<Add sx={{ color: '#d9d9d9' }} />}
                                        </div>
                                    )}
                                    <Button
                                        component='label'
                                        variant='contained'
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ width: 1 }}
                                    >
                                        {'Загрузить документы'}
                                        <VisuallyHiddenInput
                                            type='file'
                                            accept='image/*'
                                            onChange={handleFilesChange}
                                            multiple
                                        />
                                    </Button>
                                </>
                            )}
                        </div>
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{ width: 1, margin: 0 }}
                            disabled={!isValidForm}
                        >
                            Отправить
                        </Button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default CreateAbsence;
