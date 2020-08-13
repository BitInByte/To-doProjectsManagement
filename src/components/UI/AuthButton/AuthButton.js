//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './AuthButton.module.scss';

//Stateless component
const authButton = ({ changed, value, disabled }) => (
    <button disabled={disabled} onClick={changed} className={classes.Button}>{value}</button>
);

export default authButton;