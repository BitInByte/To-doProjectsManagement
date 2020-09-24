//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./BackDrop.module.scss";

//Stateless component
const backDrop = (props) => (
  <div className={classes.BackDrop} onClick={props.click} />
);

backDrop.propTypes = {
  click: PropTypes.func.isRequired,
};

export default backDrop;
