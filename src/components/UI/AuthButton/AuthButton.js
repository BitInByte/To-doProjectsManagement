//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./AuthButton.module.scss";

//Stateless component
const authButton = ({ changed, value, disabled, submit }) => {
  // let button = (
  //   <button disabled={disabled} onClick={changed} className={classes.Button}>
  //     {value}
  //   </button>
  // );
  // if (submit)
  //   button = (
  //     <button
  //       type="submit"
  //       disabled={disabled}
  //       onClick={changed}
  //       className={classes.Button}
  //     >
  //       {value}
  //     </button>
  //   );
  return (
    <button
      type={submit ? "submit" : null}
      disabled={disabled}
      onClick={changed}
      className={classes.Button}
    >
      {value}
    </button>
    // { button }
  );
};

authButton.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  changed: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  submit: PropTypes.bool.isRequired,
};

authButton.defaultProps = {
  disabled: false,
  submit: false,
};

export default authButton;
