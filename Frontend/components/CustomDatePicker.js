import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function CustomDatePicker({date,setDate,label}) {
    const [selectedDate, setSelectedDate] = useState(date ? dayjs(date) : null);

    const handleDateChange = (newValue) => {
        if (newValue && dayjs(newValue).isValid()) {
            setSelectedDate(newValue);
            setDate(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(param) => <TextField {...param} />}
                format="DD/MM/YYYY"
            />
        </LocalizationProvider>
    );
}