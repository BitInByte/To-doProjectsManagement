//Import libraries
import React from "react";
import moment from "moment";

//Import components

//Import scoped class modules
import classes from "./ArchivedProjects.module.scss";

//Stateless component
const ArchivedProjects = ({ title, dateCreated, dateArchived }) => (
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

export default ArchivedProjects;
