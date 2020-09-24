//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components
import Spinner from "@material-ui/core/CircularProgress";

//Import scoped class modules
import classes from "./Spinner.module.scss";

//Stateless component
const spinner = ({ color }) => {
  let classeSpinner = classes.Spinner;
  if (color === "blue") classeSpinner = classes.SpinnerBlue;

  // return <Spinner classes={{ root: classes.Spinner }} />
  return <Spinner classes={{ root: classeSpinner }} />;
};

spinner.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

spinner.defaultProps = {
  color: undefined,
};

export default spinner;
