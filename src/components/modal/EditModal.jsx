import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useInput } from '../../hooks/useInput';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function EditModal({ isOpen, handleClose, user }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const email = useInput(user?.email, { isEmailValid: true, isEmpty: true });
    const fullName = useInput(user?.fullName, { isEmpty: true });
    const [role, setRole] = React.useState(user?.role);

    const handleChange = (e) => {
        setRole(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    const handleForm = () => {
        if (email.isEmptyError || fullName.isEmptyError || email.emailError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    useEffect(() => {
        email.setValue(user.email);
        fullName.setValue(user.fullName);
    }, []);

    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value]);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle sx={{ margin: 0, paddingX: 3 }}>Редактирование данных</DialogTitle>
                <DialogContent
                    sx={{
                        boxSizing: 'border-box',
                        maxWidth: '900px',
                        width: '100%',
                    }}
                >
                    <form action='' onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <TextField
                                label={'ФИО'}
                                sx={{ width: 1, marginBottom: '20px' }}
                                value={fullName.value}
                                onChange={(e) => {
                                    fullName.onChange(e);
                                }}
                            />
                            <TextField
                                label={email.emailError ? 'Невалидный email' : 'Email'}
                                type={'email'}
                                sx={{ width: 1, marginBottom: '20px' }}
                                value={email.value}
                                onChange={(e) => {
                                    email.onChange(e);
                                }}
                                error={email.emailError}
                            />
                            <FormControl
                                sx={{ width: 1, maxWidth: '200px', boxSizing: 'border-box' }}
                            >
                                <InputLabel id='status-label'>Роль</InputLabel>
                                <Select
                                    labelId='status-label'
                                    sx={{
                                        width: 1,

                                        height: '56px',
                                        color: '#000',
                                        backgroundColor: '#fff',
                                    }}
                                    label='Статус'
                                    size='medium'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Student'}>Студент</MenuItem>
                                    <MenuItem value={'Teacher'}>Преподаватель</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions sx={{ marginRight: '18px', marginBottom: '10px' }}>
                    <Button autoFocus onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={handleClose}
                        autoFocus
                        loading={isLoading}
                        disabled={!isValidForm}
                        sx={{
                            backgroundColor: '#ffbf03',
                            color: '#000',
                        }}
                    >
                        Изменить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
