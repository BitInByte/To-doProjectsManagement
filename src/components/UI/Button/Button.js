//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Button.module.scss";

//Stateless component
const button = ({ name, click, disabled, submit }) => (
  <button
    type={submit ? "submit" : null}
    className={classes.Button}
    onClick={click}
    disabled={disabled}
  >
    {name}
  </button>
);

button.propTypes = {
  name: PropTypes.string.isRequired,
  click: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  disabled: PropTypes.bool.isRequired,
  submit: PropTypes.bool,
};

button.defaultProps = {
  disabled: false,
};

export default button;
