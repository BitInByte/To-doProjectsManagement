//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './NavItem.module.scss';

//Stateless component
const navItem = (props) => {


    const { children, title } = props;

    return (
        <div className={classes.NavItem}>
            <div className={classes.NavItem__icon}>
                {children}
            </div>
            <div className={classes.NavItem__title}>
                {title}
            </div>
        </div>
    );
};

export default navItem;