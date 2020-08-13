//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Button.module.scss';

//Stateless component
const button = ({ name, click, disabled }) => <button className={classes.Button} onClick={click} disabled={disabled} >{name}</button>;

export default button;