//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./TodoWrapper.module.scss";

//Stateless component
const todoWrapper = ({ children }) => (
  <div className={classes.TodoWrapper}>{children}</div>
);

todoWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default todoWrapper;
