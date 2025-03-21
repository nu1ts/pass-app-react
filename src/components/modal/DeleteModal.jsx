import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Button, Switch, FormControlLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useInput } from '../../hooks/useInput';
import { rejectAbsence } from '../../api/absences/absencesService';
import { ErrorToast, SuccessToast, WarningToast } from '../../utils/notifications/notifications';
import { CLIENT_ERROR, ERROR_401, SERVER_ERROR } from '../../utils/constants/errorCode';
import { useDispatch, useSelector } from 'react-redux';
import { setAbsences } from '../../store/reducers/absencesReducer';

export default function DeleteModal({ isOpen, handleClose, id }) {
    const inputRef = useRef(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const comment = useInput('', { minLength: 6, isEmpty: true });

    const [isValidForm, setIsValidForm] = useState(false);
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { absences } = useSelector((state) => state.absences);
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

    const dispatch = useDispatch();

    useEffect(() => {
        handleValid();
    }, [checked, isValidForm]);

    useEffect(() => {
        handleForm();
    }, [comment.minLengthError]);

    useEffect(() => {
        if (checked) {
            inputRef.current?.focus();
        }
    }, [checked]);

    const reject = async () => {
        const response = await rejectAbsence(id, comment?.value || null);
        if (response.ok) {
            dispatch(setAbsences(absences.filter((item) => item.id != id)));
            return WarningToast('Заявка отклонена');
        } else {
            if (response.status === 400) {
                ErrorToast(CLIENT_ERROR);
            }
            if (response.status === 401) {
                ErrorToast(ERROR_401);
            }
            if (response.status >= 500) {
                ErrorToast(SERVER_ERROR);
            }
        }
    };

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
                            sx={{ width: '100%', marginBottom: '20px' }}
                            inputRef={inputRef}
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
                        onClick={reject}
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
