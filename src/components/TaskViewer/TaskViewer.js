//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./TaskViewer.module.scss";

//Stateless component
const taskViewer = ({ title, desc, date }) => (
  <div className={classes.TaskViewer}>
    <h2 className={classes.TaskViewer__title}>{title}</h2>
    <p className={classes.TaskViewer__date}>{date}</p>
    <div>
      <p className={classes.TaskViewer__desc}>{desc}</p>
    </div>
  </div>
);

taskViewer.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export default taskViewer;
