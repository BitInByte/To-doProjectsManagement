//Import libraries
import React, { useState } from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./FileInput.module.scss";

//Stateless component
const FileInput = ({ file, fileHandler }) => {
  if (file) {
    const extension = file.name.split(".").pop();
  }

  // Stores a reference for the hidden button
  const [fileInputRef, setFileInputRef] = useState(null);

  // Handles a click from the visible button to the file input
  const handleClick = (event) => {
    event.preventDefault();
    fileInputRef.click();
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
        ref={(inputRef) => setFileInputRef(inputRef)}
        onChange={(ev) => fileHandler(ev)}
        className={classes.FileInput__input}
        hidden
      />
    </div>
  );
};

FileInput.propTypes = {
  fileHandler: PropTypes.func.isRequired,
  file: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

export default FileInput;
