//Import libraries
import React from "react";
import { NavLink, Link } from "react-router-dom";

//Import components

//Import scoped class modules
import classes from "./SideDrawer.module.scss";

//Stateless component
const SideDrawer = (props) => {
  // Get the props show to conditional attribute classes
  const { show, click } = props;

  let drawerClasses = [classes.SideDrawer];

  // If it's true, then show the SideDrawer with a helper class with translate
  if (show) drawerClasses = [classes.SideDrawer, classes.SideDrawerOpen];

  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <NavLink
          to="/"
          exact
          activeClassName={classes.SideDrawer__active}
          onClick={click}
        >
          <li>Dashboard</li>
        </NavLink>
        <NavLink
          to="/todos"
          activeClassName={classes.SideDrawer__active}
          onClick={click}
        >
          <li>TO-DO</li>
        </NavLink>
        <NavLink
          to="/projects"
          activeClassName={classes.SideDrawer__active}
          onClick={click}
        >
          <li>Projects</li>
        </NavLink>
        <NavLink
          to="/archive"
          activeClassName={classes.SideDrawer__active}
          onClick={click}
        >
          <li>Archive</li>
        </NavLink>
        <Link to="/logout">
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  );
};

export default SideDrawer;
