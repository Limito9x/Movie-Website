import {
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
import { useState, useEffect } from "react";

export default function DataManage({ open, onClose, config, data, label }) {
  const [openUpdateState, setOpenUpdateState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Gọi hàm khi component mount hoặc khi open thay đổi
  // useEffect(() => {
  //   if (open) {
  //     atcRefetch();
  //   }
  // }, [open]);
  const handleUpdate = (item) => {
    setOpenUpdateState(true);
    setSelectedItem(item);
  };
  const [deleteItem] = config.api.useDeleteMutation();

  const handleDelete = async (item) => {
    try {
      if (confirm("Xác nhận xóa ?")) {
        await deleteItem(item.id).unwrap();
        alert("Xóa thành công!");
      }
    } catch (error) {
      console.log(error);
      alert("Xóa thất bại!");
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
        <div>Quản lý {label}</div>
        <Tooltip title="Thêm mới">
          <AddItemDialog label={label} config={config} />
        </Tooltip>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: 300 }}>
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
          config={config}
          data={selectedItem}
          label={label}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
