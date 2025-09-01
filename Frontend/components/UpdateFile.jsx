import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useMemo } from "react";
import Dropzone from "./Dropzone";

function FileItem({ url, type, isDeleted }) {
  return (
    <Card
      sx={{
        position: "relative",
        width: "auto",
        height: "100%",
        border: isDeleted ? "2px solid red" : "1px solid #ccc",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 20,
        },
      }}
    >
      {type === "image" ? (
        <CardMedia
          component="img"
          image={url}
          sx={{ height: "100%", width: "auto", objectFit: "cover" }}
        />
      ) : (
        <CardMedia
          component="video"
          src={url}
          controls
          sx={{ height: "100%", objectFit: "contain" }}
        />
      )}

      {isDeleted && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Typography variant="h5" color="red" fontWeight="bold">
            X
          </Typography> */}
        </Box>
      )}
    </Card>
  );
}

export default function UpdateFile({
  fileType,
  label,
  onAdd,
  onDelete,
  maxFiles,
  items,
  urlName,
  publicIdName,
}) {
  const [markedSet, setMarkedSet] = useState(new Set());
  const markedAll = markedSet.size === items.length;

  const toggleMark = (id) => {
    setMarkedSet((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const handleMarkupAll = () => {
    setMarkedSet((prev) =>
      prev.size === items.length
        ? new Set()
        : new Set(items.map((item) => item[publicIdName]))
    );
  };

  useEffect(() => {
    if (onDelete) {
      onDelete(Array.from(markedSet));
    }
  }, [markedSet]);

  const maxAdd = useMemo(() => {
    return maxFiles - (items.length - markedSet.size);
  }, [items, markedSet]);

  return (
    <Accordion
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography component="span">{label || "Hình ảnh/Video"}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-center">
              <Typography>Đánh dấu xóa</Typography>
              <div>
                <FormControlLabel
                  label="Chọn tất cả"
                  control={
                    <Checkbox onClick={handleMarkupAll} checked={markedAll} />
                  }
                />
              </div>
            </div>
            <Box
              sx={{
                border: "1px solid #555",
                borderRadius: 2,
                padding: 1,
                background: "#e5edfcff", // nền sáng dịu
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  alignItems: "center",
                }}
              >
                {items.map((item) => (
                  <Box
                    key={item[publicIdName]}
                    sx={{
                      flex: "0 0 auto",
                      width: fileType === "video" ? 400 : "auto",
                      height: fileType === "video" ? 250 : 200,
                      borderRadius: 2,
                      position: "relative",
                      padding: 1,
                    }}
                  >
                    <FileItem
                      type={fileType}
                      url={item[urlName]}
                      isDeleted={markedSet.has(item[publicIdName])}
                    ></FileItem>

                    {/* Nút X */}
                    <IconButton
                      size="small"
                      onClick={() => toggleMark(item[publicIdName])}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(255, 255, 255, 0.5)",
                        border: 1,
                        borderColor: "black",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                      }}
                    >
                      <CloseIcon
                        fontSize="small"
                        sx={{
                          opacity: markedSet.has(item[publicIdName]) ? 1 : 0,
                          transition: "0.2s",
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </div>
          {maxAdd > 0 && (
            <div>
              <Typography>Thêm mới (tối đa {maxAdd} file)</Typography>
              <Dropzone
                maxFiles={maxAdd}
                fileType={fileType}
                label={label}
                onChange={(value) => {
                  onAdd(value);
                }}
              ></Dropzone>
            </div>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
