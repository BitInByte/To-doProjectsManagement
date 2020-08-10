//Import libraries
import React from 'react';

//Import components
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import FolderIcon from '@material-ui/icons/Folder';
import ArchiveIcon from '@material-ui/icons/Archive';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavItem from './NavItem/NavItem';
import SideDrawerButton from './SideDrawer/DrawerToggleButton/DrawerToggleButton';


//Import scoped class modules
import classes from './Navbar.module.scss';

//Stateless component
const navbar = props => {

    const { drawerClickHandler } = props;

    return (
        <div className={classes.Navbar}>
            {/* Button to toggle SideDrawer */}
            <div className={classes.SideDrawerButton}>
                <SideDrawerButton click={drawerClickHandler} />
            </div>
            {/* USER */}
            <div className={classes.User}>
                JP
            </div>
            {/* ICONS */}
            <div className={classes.Nav}>
                <NavItem title="Dashboard">
                    <DashboardIcon style={{ fontSize: '4.5rem' }} />
                </NavItem>
                <NavItem title="TO-DO">
                    <ViewListIcon style={{ fontSize: '5rem' }} />
                </NavItem>
                <NavItem title="PROJECTS">
                    <FolderIcon style={{ fontSize: '4.5rem' }} />
                </NavItem>
                <NavItem title="ARCHIVE">
                    <ArchiveIcon style={{ fontSize: '4.5rem' }} />
                </NavItem>
            </div>
            {/* LOGOUT */}
            <div className={classes.Logout}>
                <ExitToAppIcon style={{ fontSize: '4.5rem' }} />
            </div>
        </div>
    );
};

export default navbar;