//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Button.module.scss';

//Stateless component
const Button = ({ name }) => <button className={classes.Button}>{name}</button>;

export default Button;