//Import libraries
import React from "react";

//Import components

//Import scoped class modules
import classes from "./Error.module.scss";

//Stateless component
const Error = ({ errorMessage }) => (
  <p className={classes.Error}>{errorMessage}</p>
);

export default Error;
