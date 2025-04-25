import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import "dayjs/locale/vi";

export default function CustomDatePicker({date,setDate,label}) {
    const [selectedDate, setSelectedDate] = useState(date ? dayjs(date) : null);

    const handleDateChange = (newValue) => {
        if (newValue && dayjs(newValue).isValid()) {
            setSelectedDate(newValue);
            setDate(newValue);
        }
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="vi">
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
        />
      </LocalizationProvider>
    );
}