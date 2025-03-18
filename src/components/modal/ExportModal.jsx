import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import UserSelect from '../select/UserSelect';
import DateInput from '../datePicker/DateInput';
import { dateAreValid, endDateValid } from '../../utils/dateValidation';

export default function ExportModal({ isOpen, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);

    const [selected, setSelected] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    const handleForm = () => {
        return setIsValidForm(dateAreValid(firstDate, secondDate) && selected.length > 0);
    };

    useEffect(() => {
        handleForm();
    }, [firstDate, secondDate, selected]);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle>Экспорт пропусков</DialogTitle>
                <Divider sx={{ marginX: '20px' }} />
                <DialogContent>
                    <form className='modal-form' action='' onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <UserSelect value={selected} setValue={setSelected} />
                            <div className='flex row-d justify-content-sb'>
                                <DateInput
                                    date={firstDate}
                                    setDate={setFirstDate}
                                    label={'Начало'}
                                    sx={{ width: '49%' }}
                                />
                                <DateInput
                                    date={secondDate}
                                    setDate={setSecondDate}
                                    label={'Конец'}
                                    sx={{ width: '49%' }}
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
