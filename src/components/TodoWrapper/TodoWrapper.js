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
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.node.isRequired,
  ]),
};

export default todoWrapper;
