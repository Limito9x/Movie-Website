import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";

/**
 * name: Tên của trường dữ liệu
 * date: Giá trị mặc định của trường dữ liệu
 * setDate: Hàm để cập nhật giá trị của trường dữ liệu (name)
 * label: Nhãn hiển thị
 */

export default function CustomDatePicker({ date, name, setDate, label },props) {
  const [selectedDate, setSelectedDate] = useState(date ? dayjs(date) : null);
  const handleDateChange = (newValue) => {
    if (newValue && dayjs(newValue).isValid()) {
      setSelectedDate(newValue);
      setDate((prev) => ({ ...prev, [name]: newValue }));
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
