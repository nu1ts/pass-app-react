import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';

export default function DeleteModal({ isOpen, handleClose, id }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const comment = useInput('', { minLength: 6, isEmpty: true });

    const [isValidForm, setIsValidForm] = useState(false);
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleForm = () => {
        if (comment.minLengthError || comment.isEmptyError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    const handleValid = () => {
        if (!checked) {
            setDisabled(false);
        } else {
            setDisabled(!isValidForm);
        }
    };

    useEffect(() => {
        handleValid();
    }, [checked, isValidForm]);

    useEffect(() => {
        handleForm();
    }, [comment.minLengthError]);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle>Отклонить заявку</DialogTitle>
                <DialogContent>
                    <form action='' onSubmit={handleSubmit}>
                        <TextField
                            label={
                                comment.minLengthError
                                    ? `Минимальная длина 6 символов`
                                    : `Комментарий`
                            }
                            value={comment.value}
                            error={comment.minLengthError}
                            onChange={(e) => {
                                comment.onChange(e);
                            }}
                            disabled={!checked}
                            sx={{ width: '100%' }}
                        />
                        <FormControlLabel
                            value={checked}
                            control={
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label='Добавить комментарий'
                            labelPlacement='end'
                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ marginRight: '18px', marginBottom: '10px' }}>
                    <Button autoFocus onClick={handleClose} color={'default'}>
                        Отмена
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={handleClose}
                        sx={{
                            boxShadow: 'none',
                        }}
                        disabled={disabled}
                        color={'error'}
                    >
                        Отклонить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
