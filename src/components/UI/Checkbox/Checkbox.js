//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Checkbox.module.scss";

//Stateless component
const checkbox = ({ click, isChecked }) => {
  const clickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <label onClick={clickHandler} className={classes.Checkbox}>
      <input
        type="checkbox"
        className={classes.Checkbox__input}
        onChange={click}
        checked={isChecked}
      />
      <span className={classes.Checkbox__box} />
    </label>
  );
};

checkbox.propTypes = {
  click: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default checkbox;
