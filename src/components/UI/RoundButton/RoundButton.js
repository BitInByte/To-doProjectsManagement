//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./RoundButton.module.scss";

//Stateless component
const roundButton = ({ click, name }) => (
  <button className={classes.RoundButton} onClick={click}>
    {name}
  </button>
);

roundButton.propTypes = {
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default roundButton;
