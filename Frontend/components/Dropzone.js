import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`

// Register the plugins

// Our app
export default function Dropzone({ state, setState }) {
  const setFiles = (files) => {
    setState((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  return (
    <div className="App">
      <FilePond
        files={state || []}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        allowMultiple={true}
        maxFiles={3}
        name="images" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}
