//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components
import Button from "../UI/Button/Button";

//Import scoped class modules
import classes from "./Controllers.module.scss";

//Stateless component
const controllers = ({ btn1, btn2, btn1Click, btn2Click }) => (
  <div className={classes.Controllers}>
    {/* ADD NEW BUTTON */}
    <Button name={btn1} click={btn1Click} />
    {/* HIDE COMPLETED */}
    <Button name={btn2} click={btn2Click} />
  </div>
);

controllers.propTypes = {
  btn1: PropTypes.string.isRequired,
  btn2: PropTypes.string.isRequired,
  btn1Click: PropTypes.func.isRequired,
  btn2Click: PropTypes.func.isRequired,
};

export default controllers;
