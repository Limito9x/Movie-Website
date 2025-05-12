import { FilePond, registerPlugin } from "react-filepond";

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
        acceptedFileTypes={[acceptedFileTypes[fileType]]|| []}
        allowFileTypeValidation={true}
        files={state || []}
        onupdatefiles={(fileItems) => {
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
