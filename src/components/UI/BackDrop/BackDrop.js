//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './BackDrop.module.scss';

//Stateless component
const BackDrop = props => <div className={classes.BackDrop} onClick={props.click} />;

export default BackDrop;