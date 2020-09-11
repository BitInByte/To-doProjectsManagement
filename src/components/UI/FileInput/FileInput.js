//Import libraries
import React, { useRef, useState } from "react";

//Import components

//Import scoped class modules
import classes from "./FileInput.module.scss";

//Stateless component
const FileInput = ({ file, fileHandler }) => {
  console.log("File");
  console.log(file);
  if (file) {
    console.log(file.type.split("/")[0]);
    const extension = file.name.split(".").pop();
    console.log(extension);
  }

  // Stores a reference for the hidden button
  //   const fileInputButton = useRef(null);
  // const fileInputButton = useRef();
  const [fileInputRef, setFileInputRef] = useState(null);

  // Handles a click from the visible button to the file input
  const handleClick = (event) => {
    event.preventDefault();
    console.log(fileInputRef);
    // fileInputButton.current.click();
    fileInputRef.click();
  };

  // const fileHandlerInput = (event) => {
  //   console.log("@@@@@@@@@@FILE EVENT");
  //   console.log(event.target.files[0]);
  // };

  return (
    <div className={classes.FileInput}>
      <button className={classes.FileInput__button} onClick={handleClick}>
        choose
      </button>
      <span className={classes.FileInput__fileName}>
        {file ? file.name : "choose your file..."}
      </span>
      <input
        type="file"
        // ref={fileInputButton}
        ref={(inputRef) => setFileInputRef(inputRef)}
        // ref="fileInputButton"
        // onChange={(ev) => fileHandlerInput(ev)}
        onChange={(ev) => fileHandler(ev)}
        className={classes.FileInput__input}
        hidden
      />
    </div>
  );
};

export default FileInput;
