//Import libraries
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./ArchivedProjects.module.scss";

//Stateless component
const archivedProjects = ({ title, dateCreated, dateArchived }) => (
  <div className={classes.ArchivedProjects}>
    <div className={classes.ArchivedProjects__title}>
      <h3>{title}</h3>
    </div>
    <div className={classes.ArchivedProjects__dates}>
      <p>
        <span>Date created: </span>
        {`${moment(dateCreated).format("MMM Do YY")}`}
      </p>
      <p>
        <span>Date closed: </span>
        {`${moment(dateArchived).format("MMM Do YY")}`}
      </p>
    </div>
  </div>
);

archivedProjects.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.instanceOf(Date).isRequired,
  dateArchived: PropTypes.instanceOf(Date).isRequired,
};

export default archivedProjects;
