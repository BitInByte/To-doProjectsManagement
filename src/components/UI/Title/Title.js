//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Title.module.scss";

//Stateless component
const title = ({ title }) => <h2 className={classes.Title}>{title}</h2>;

title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default title;
