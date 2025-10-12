import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";

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
