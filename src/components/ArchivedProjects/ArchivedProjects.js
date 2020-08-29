//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './ArchivedProjects.module.scss';

//Stateless component
const ArchivedProjects = ({ title }) => (
    <div className={classes.ArchivedProjects}>
        <div className={classes.ArchivedProjects__title}><h3>{title}</h3></div>
        <div className={classes.ArchivedProjects__dates}>
            <p><span>Date created:</span> </p>
            <p><span>Date closed:</span> </p>
        </div>

    </div>
);

export default ArchivedProjects;