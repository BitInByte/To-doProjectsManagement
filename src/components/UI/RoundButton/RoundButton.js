//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './RoundButton.module.scss';

//Stateless component
const roundButton = ({ click, name }) => (
    <button className={classes.RoundButton} onClick={click}>{name}</button>
);

export default roundButton;