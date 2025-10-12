import { FilePond, registerPlugin } from "react-filepond";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);

export default function Dropzone({
  onChange,
  maxFiles,
  fileType,
  label,
  purpose
}) {
  const [files,setFiles] = useState([]);
  useEffect(() => {
    if (files && files.length > maxFiles) {
      const newFiles = files.slice(0, maxFiles);
      setFiles(newFiles);
      onChange(newFiles.map(newFile=>newFile.file));
    }
  }, [maxFiles]);

  const acceptedFileTypes = {
    image: "image/*",
    video: "video/*",
    audio: "audio/*",
    document: "application/pdf",
  };

  return (
    <div className="w-full">
      {purpose === "create" && <Typography>{label}</Typography>}
      <FilePond
        acceptedFileTypes={fileType ? [acceptedFileTypes[fileType]] : []}
        allowFileTypeValidation={true}
        files={files}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems);
          onChange(fileItems.map((fileItem) => fileItem.file));
        }}
        allowMultiple={maxFiles > 1}
        maxFiles={maxFiles || 1}
        /* name sets the file input name, 
        it's filepond by default,
        note: this name only effect when using prop server
        to automatically upload without create formData */
        labelIdle={
          label
            ? `Kéo, thả hoặc chọn ${label.toLowerCase()} (tối đa ${maxFiles} file)`
            : 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        }
      />
    </div>
  );
}
