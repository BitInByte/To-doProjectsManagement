//Import libraries
import React from "react";
import { Link } from "react-router-dom";

//Import components
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewListIcon from "@material-ui/icons/ViewList";
import FolderIcon from "@material-ui/icons/Folder";
import ArchiveIcon from "@material-ui/icons/Archive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import NavItem from "./NavItem/NavItem";
import SideDrawerButton from "./SideDrawer/DrawerToggleButton/DrawerToggleButton";

//Import scoped class modules
import classes from "./Navbar.module.scss";

//Stateless component
const navbar = (props) => {
  const { drawerClickHandler, initials, profileImage } = props;

  return (
    <div className={classes.Navbar}>
      {/* Button to toggle SideDrawer */}
      <div className={classes.SideDrawerButton}>
        <SideDrawerButton click={drawerClickHandler} />
      </div>
      {/* USER */}
      <Link to="/settings">
        {profileImage ? (
          <img
            className={classes.ProfileImg}
            src={profileImage}
            alt={initials}
          />
        ) : (
          <div className={classes.User}>{initials}</div>
        )}
        {/* <div className={classes.User}>{initials}</div> */}
      </Link>
      {/* ICONS */}
      <nav className={classes.Nav}>
        <ul>
          <NavItem link="/" exact title="Dashboard">
            <DashboardIcon style={{ fontSize: "4.5rem" }} />
          </NavItem>
          <NavItem link="/todos" title="TO-DO">
            <ViewListIcon style={{ fontSize: "5rem" }} />
          </NavItem>
          <NavItem link="/projects" title="PROJECTS">
            <FolderIcon style={{ fontSize: "4.5rem" }} />
          </NavItem>
          <NavItem link="/archive" title="ARCHIVE">
            <ArchiveIcon style={{ fontSize: "4.5rem" }} />
          </NavItem>
        </ul>
      </nav>
      {/* LOGOUT */}
      <div className={classes.Logout}>
        <Link to="/Logout">
          <ExitToAppIcon style={{ fontSize: "4.5rem" }} />
        </Link>
      </div>
    </div>
  );
};

export default navbar;
