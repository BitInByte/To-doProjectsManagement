//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Title.module.scss';

//Stateless component
const title = ({ title }) => <h2 className={classes.Title}>{title}</h2>

export default title;