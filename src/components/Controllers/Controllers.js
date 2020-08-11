//Import libraries
import React from 'react';

//Import components
import Button from '../UI/Button/Button';

//Import scoped class modules
import classes from './Controllers.module.scss';

//Stateless component
const Controllers = (props) => (
    <div className={classes.Controllers}>
        {/* ADD NEW BUTTON */}
        <Button name="Add new" />
        {/* HIDE COMPLETED */}
        <Button name="Show done" />
    </div>
);

export default Controllers;