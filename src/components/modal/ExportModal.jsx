import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button, MenuItem, FormControl, InputLabel, Select, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useInput } from '../../hooks/useInput';
import UserSelect from '../select/UserSelect';
import DateInput from '../datePicker/DateInput';

export default function ExportModal({ isOpen, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    const handleForm = () => {};

    useEffect(() => {
        handleForm();
    }, []);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle>Экспорт пропусков</DialogTitle>
                <DialogContent>
                    <form className='modal-form' action='' onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <UserSelect />
                            <div className='flex row-d justify-content-sb'>
                                <DateInput
                                    date={firstDate}
                                    setDate={setFirstDate}
                                    label={'Начало'}
                                />
                                <DateInput
                                    date={secondDate}
                                    setDate={setSecondDate}
                                    label={'Конец'}
                                />
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
                        Применить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
