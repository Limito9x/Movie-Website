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
import { useState, useEffect } from "react";

export default function DataManage({
  open,
  onClose,
  api,
  categoryName,
  data,
  atcRefetch,
  addConfig,
  updateConfig,
}) {
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
  const handleDelete = async (item) => {
    try {
      if (confirm("Xác nhận xóa ?")) {
        await api.delete(item.id);
        alert("Xóa thành công!");
        await atcRefetch();
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
            refetch={atcRefetch}
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
          refetch={atcRefetch}
          label={categoryName}
        ></UpdateItemDialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
