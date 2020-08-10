//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './SideDrawer.module.scss';

//Stateless component
const SideDrawer = props => {

    // Get the props show to conditional attribute classes
    const { show } = props;

    let drawerClasses = [classes.SideDrawer];

    // If it's true, then show the SideDrawer with a helper class with translate
    if (show) drawerClasses = [classes.SideDrawer, classes.SideDrawerOpen];

    return (
        <nav className={drawerClasses.join(' ')}>
            <ul>
                <li>Dashboard</li>
                <li>TO-DO</li>
                <li>Projects</li>
                <li>Archive</li>
                <li>Logout</li>
            </ul>
        </nav>
    );
};

export default SideDrawer;