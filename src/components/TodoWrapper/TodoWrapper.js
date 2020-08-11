//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './TodoWrapper.module.scss';

//Stateless component
const todoWrapper = ({ children }) => (
    <div className={classes.TodoWrapper}>
        {children}
    </div>
);

export default todoWrapper;