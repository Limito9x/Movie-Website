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

export default function CustomDatePicker({ value, onChange, ...props }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="vi">
      <DatePicker
        label={props.label}
        value={value === "" ? null : dayjs(value)}
        onChange={(value)=>onChange(value)}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...props } }}
      />
    </LocalizationProvider>
  );
}
