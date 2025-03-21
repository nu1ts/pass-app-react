import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import InfoChip from '../chip/InfoChip';
import UserSelect from '../select/UserSelect';
import DateInput from '../datePicker/DateInput';
import { dateAreValid, endDateValid } from '../../utils/dateValidation';
import { exportAbsences } from '../../api/absences/absencesService';
import { getExportQuery } from '../../utils/converter/paramsConverter';
import { ErrorToast, SuccessToast } from '../../utils/notifications/notifications';
import { ToastContainer } from 'react-toastify';
import { CLIENT_ERROR } from '../../utils/constants/errorCode';

export default function ExportModal({ isOpen, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);
    const [groupNumber, setGroupNumber] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [selected, setSelected] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await exportAbsences(
            await getExportQuery({
                Type: type || null,
                Status: status || null,
                GroupId: groupNumber || null,
                StartDate: firstDate || null,
                EndDate: secondDate || null,
                studentIds: selected || null,
            }),
        )
            .then((response) => {
                if (!response.ok) {
                    setIsLoading(false);
                    return ErrorToast(CLIENT_ERROR);
                }

                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = 'download.xlsx';
                if (contentDisposition) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(contentDisposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                } else {
                    filename = 'download.xlsx';
                }

                return response.blob().then((blob) => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setIsLoading(false);
                return SuccessToast('Файлы получены');
            });

        setIsLoading(false);
        handleClose();
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        console.log(
            getExportQuery({
                Type: type || null,
                Status: status || null,
                GroupId: groupNumber || null,
                StartDate: firstDate || null,
                EndDate: secondDate || null,
                studentIds: selected || null,
            }),
        );
    }, [type, firstDate, secondDate, status, selected]);

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
                            <div className='flex row-d justify-content-sb mt-20'>
                                <FormControl>
                                    <InputLabel id='status-label'>Статус</InputLabel>
                                    <Select
                                        labelId='status-label'
                                        value={status}
                                        sx={{
                                            minWidth: '240px',
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
                                            minWidth: '240px',
                                            maxWidth: '230px',
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
                                        <MenuItem value={'Family'}>
                                            Семейные обстоятельства
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                label={'Группа'}
                                inputProps={{
                                    maxLength: 6,
                                    type: 'number',
                                }}
                                inputMode={'numeric'}
                                size='medium'
                                sx={{ width: '200px', marginTop: '20px' }}
                                value={groupNumber}
                                onInput={(e) => {
                                    let group = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, e.target.maxLength);
                                    setGroupNumber(isNaN(group) ? '' : group);
                                }}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions sx={{ marginRight: '18px', marginBottom: '10px' }}>
                    <Button autoFocus onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        loading={isLoading}
                        sx={{
                            backgroundColor: '#ffbf03',
                            color: '#000',
                        }}
                    >
                        Применить
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
}
