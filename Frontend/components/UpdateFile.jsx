import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useMemo } from "react";
import Dropzone from "./Dropzone";
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
                marginTop: 1,
                display: "flex",
                gap: 2,
                overflowX: "auto", // scroll ngang
                p: 2,
                maxWidth: "100%", // giới hạn chiều rộng
                border: "1px solid #555",
                borderRadius: 2,
              }}
            >
              {items.map((item) => (
                <Box
                  key={item[publicIdName]}
                  sx={{
                    width: 150,
                    height: 150,
                    flex: "0 0 auto",
                    borderRadius: 2,
                    backgroundImage:
                      item[urlName] && item[urlName] !== ""
                        ? `url("${item[urlName]}")`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    overflow: "auto",
                  }}
                >
                  {/* Overlay sáng */}
                  {markedSet.has(item[publicIdName]) && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(255,255,255,0.18)",
                        borderRadius: 2,
                      }}
                    />
                  )}

                  {/* Nút X */}
                  <IconButton
                    size="small"
                    onClick={() => toggleMark(item[publicIdName])}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(255,255,255,0.5)",
                      border: 1,
                      borderColor: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    <CloseIcon
                      fontSize="small"
                      sx={{
                        opacity: markedSet.has(item[publicIdName]) ? 1 : 0.2,
                        transition: "0.2s",
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
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
