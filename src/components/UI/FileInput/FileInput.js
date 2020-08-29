//Import libraries
import React, { useRef } from "react";

//Import components

//Import scoped class modules
import classes from "./FileInput.module.scss";

//Stateless component
const FileInput = ({ file }) => {
  console.log("File");
  console.log(file);

  // Stores a reference for the hidden button
  //   const fileInputButton = useRef(null);
  const fileInputButton = useRef();

  // Handles a click from the visible button to the file input
  const handleClick = (event) => {
    fileInputButton.current.click();
  };

  const fileHandlerInput = (event) => {
    console.log("@@@@@@@@@@FILE EVENT");
    console.log(event.target.files[0]);
  };

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
        ref={fileInputButton}
        // ref="fileInputButton"
        onChange={(ev) => fileHandlerInput(ev)}
        className={classes.FileInput__input}
      />
    </div>
  );
};

export default FileInput;
