import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddItemDialog from "./AddItemDialog";
import UpdateItemDialog from "./UpdateItemDialog";
import { useState,useEffect } from "react";
/* Dialog:
Header: Tiêu đề "Quan lý <tên danh mục>", góc phải là dấu + thêm đối tượng mới cho danh mục
Phần thân sẽ gồm 1 list dữ liệu danh mục (có độ dài tối đa và auto scroll),
mỗi dòng dữ liệu sẽ chỉ hiện tên và bên phải cùng sẽ là 2 nút cập nhật và xóa
*/
export default function DataManage({
  open,
  onClose,
  categoryName,
  api,
  atcRefetch,
  addConfig,
  updateConfig,
}) {
  const [data,setData] = useState([]);
  const [openUpdateState, setOpenUpdateState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Hàm để gọi API lấy dữ liệu
  const refetchData = async () => {
    try {
      const response = await api.getAll();
      setData(response);
      atcRefetch();
    } catch (error) {
      console.log(error);
    }
  };
  // Gọi hàm khi component mount hoặc khi open thay đổi
  useEffect(() => {
    if (open) {
      refetchData();
    }
  }, [open]);
    const handleUpdate = (item) => {
      setOpenUpdateState(true);
      setSelectedItem(item);
    };
  const handleDelete = async (item) => {
    try {
      if (confirm("Xác nhận xóa ?")) {
        await api.delete(item.id);
        alert("Xóa thành công!");
        await refetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            minWidth: 350, // Đảm bảo tối thiểu 350px
            maxWidth: "fit-content", // Rộng vừa đủ nội dung
            borderRadius: 2, // Bo góc đẹp
            p: 1, // Padding trong dialog
          },
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="flex items-center gap-5 justify-between">
        <div>Quản lý {categoryName}</div>
        <Tooltip title="Thêm mới">
          <AddItemDialog
            label={categoryName}
            inputConfig={addConfig}
            instance={api}
            refetch={refetchData}
          ></AddItemDialog>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <List sx={{ bgcolor: "background.paper" }}>
          {data?.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <div>
                  <Tooltip title="Cập nhật">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleUpdate(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              }
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <UpdateItemDialog
          openState={openUpdateState}
          handleClose={() => setOpenUpdateState(false)}
          inputConfig={updateConfig}
          instance={api}
          dataValue={selectedItem}
          refetch={refetchData}
        ></UpdateItemDialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
