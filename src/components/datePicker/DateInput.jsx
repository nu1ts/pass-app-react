import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateInput() {
    const [value, setValue] = React.useState(dayjs(new Date()));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label='Дата подачи'
                value={value}
                sx={{
                    marginRight: '10px',
                    width: '180px',
                }}
                onChange={(newValue) => setValue(newValue)}
            />
        </LocalizationProvider>
    );
}
