//Import libraries
import React from 'react';

//Import components
import Button from '../UI/Button/Button';

//Import scoped class modules
import classes from './Controllers.module.scss';

//Stateless component
const controllers = ({ btn1, btn2, btn1Click, btn2Click }) => (
    <div className={classes.Controllers}>
        {/* ADD NEW BUTTON */}
        <Button name={btn1} click={btn1Click} />
        {/* HIDE COMPLETED */}
        <Button name={btn2} click={btn2Click} />
    </div>
);

export default controllers;