//Import libraries
import React from "react";

//Import components
import Spinner from "../Spinner/Spinner";

//Import scoped class modules
import classes from "./SpinnerContainer.module.scss";

//Stateless component
const spinnerContainer = () => (
  <div className={classes.SpinnerContainer}>
    <Spinner />
  </div>
);

export default spinnerContainer;
