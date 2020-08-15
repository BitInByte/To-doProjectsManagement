//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './AuthButton.module.scss';

//Stateless component
const authButton = ({ changed, value, disabled, submit }) => {
    let button = <button disabled={disabled} onClick={changed} className={classes.Button}>{value}</button>;
    if (submit) button = <button type='submit' disabled={disabled} onClick={changed} className={classes.Button}>{value}</button>;
    return (
        // { submit ? <button type="submit" disabled={disabled} onClick={changed} className={classes.Button}>{value}</button> : <button disabled={disabled} onClick={changed} className={classes.Button}>{value}</button>}
        // { button }
        <button disabled={disabled} onClick={changed} className={classes.Button}>{value}</button>
    );
};

export default authButton;