import { FilePond, registerPlugin } from "react-filepond";
import { useEffect, useState } from "react";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);

export default function Dropzone({
  state,
  setState,
  name,
  maxFiles,
  fileType,
  label,
}) {
  const initialState = () => {
    if (state === undefined || state === null) {
      return [];
    } else if (Array.isArray(state)) {
      return state;
    } else if (typeof state === "object") {
      return [state];
    }
  };

  const [localFile, setLocalFile] = useState([]);

  useEffect(()=>{
    setLocalFile((prevFiles) => {
      if (prevFiles.length > maxFiles) {
      return prevFiles.slice(0, maxFiles);
      }
      return prevFiles;
    });
  },[maxFiles])

  const setFiles = (files) => {
    if (!name) {
      setState(files);
      return;
    }
    setState((prevState) => {
      return {
        ...prevState,
        [name]: files,
      };
    });
  };
  const acceptedFileTypes = {
    image: "image/*",
    video: "video/*",
    audio: "audio/*",
    document: "application/pdf",
  };

  return (
    <div className="App">
      <FilePond
        acceptedFileTypes={[acceptedFileTypes[fileType]] || []}
        allowFileTypeValidation={true}
        files={localFile}
        onupdatefiles={(fileItems) => {
          if (fileType === "video") {
            setFiles(fileItems[0] ? fileItems[0].file : null);
            return;
          }
          setLocalFile(fileItems);
          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        allowMultiple={maxFiles > 1}
        maxFiles={maxFiles || 1}
        name={name} /* sets the file input name, it's filepond by default */
        labelIdle={
          label
            ? `Kéo, thả hoặc chọn ${label.toLowerCase()}`
            : 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        }
      />
    </div>
  );
}
