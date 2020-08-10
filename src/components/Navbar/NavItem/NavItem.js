//Import libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

//Import components

//Import scoped class modules
import classes from './NavItem.module.scss';

//Stateless component
const navItem = (props) => {


    const { children, title, link, exact } = props;

    return (
        <li>
            <NavLink to={link} exact={exact}>
                <div className={classes.NavItem}>
                    <div className={classes.NavItem__icon}>
                        {children}
                    </div>
                    <div className={classes.NavItem__title}>
                        {title}
                    </div>
                </div>
            </NavLink>
        </li>
    );
};

export default navItem;