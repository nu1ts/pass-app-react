import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarIcon } from '@mui/x-date-pickers';
import { transformDateJson } from '../../utils/converter/dateConverter';

export default function DateInput({
    sx = {
        marginX: '10px',
        width: '180px',
    },
    date,
    setDate,
    label = 'Дата подачи',
}) {
    const setNewDate = (e) => {
        let date = new Date(e).toLocaleDateString(e);
        date = transformDateJson(date);
        setDate(date);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={date ? dayjs(date) : null}
                sx={sx}
                onChange={(e) => setNewDate(e)}
                slots={{ openPickerIcon: () => <CalendarIcon sx={{ color: '#4b4b4b' }} /> }}
            />
        </LocalizationProvider>
    );
}
