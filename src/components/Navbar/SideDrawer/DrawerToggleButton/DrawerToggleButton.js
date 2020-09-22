//Import libraries
import React from "react";

//Import components

//Import scoped class modules
import classes from "./DrawerToggleButton.module.scss";

//Stateless component
const drawerToggleButton = (props) => (
  <button className={classes.DrawerToggleButton} onClick={props.click}>
    <div className={classes.DrawerToggleButton__line} />
    <div className={classes.DrawerToggleButton__line} />
    <div className={classes.DrawerToggleButton__line} />
  </button>
);

export default drawerToggleButton;
