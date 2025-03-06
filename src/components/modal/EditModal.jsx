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
    const [role, setRole] = useState('');

    const fullName = useInput('', { isEmpty: true });
    const group = useInput('', { isEmpty: true });
    const email = useInput('', { isEmailValid: true, isEmpty: true });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    const handleForm = () => {
        if (email.isEmptyError || fullName.isEmptyError || email.emailError || group.isEmptyError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    useEffect(() => {
        email.setValue(user.email);
        fullName.setValue(user.fullName);
        group.setValue(user.group);
        setRole(user.role);
    }, [user]);

    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value, role, group.value]);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle>Редактирование данных</DialogTitle>
                <DialogContent
                    sx={{
                        boxSizing: 'border-box',
                        maxWidth: '900px',
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    <form action='' onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <TextField
                                label={'ФИО'}
                                sx={{ width: 1, marginBottom: '10px' }}
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
                            <div className='flex row-d justify-content-sb'>
                                <FormControl sx={{ width: '49%', boxSizing: 'border-box' }}>
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
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                        }}
                                    >
                                        <MenuItem value={'student'}>Студент</MenuItem>
                                        <MenuItem value={'teacher'}>Преподаватель</MenuItem>
                                    </Select>
                                </FormControl>
                                {role === 'student' && (
                                    <TextField
                                        label={'Группа'}
                                        inputProps={{
                                            maxLength: 6,
                                            type: 'number',
                                        }}
                                        inputMode={'numeric'}
                                        size='medium'
                                        sx={{ width: '49%', height: '56px' }}
                                        value={group.value}
                                        onChange={(e) => {
                                            let res = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, e.target.maxLength);
                                            group.setValue(isNaN(res) ? '' : res);
                                        }}
                                    />
                                )}
                            </div>
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
