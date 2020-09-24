//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Error.module.scss";

//Stateless component
const error = ({ errorMessage }) => (
  <p className={classes.Error}>{errorMessage}</p>
);

error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default error;
