//Import libraries
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./NavItem.module.scss";

//Stateless component
const navItem = (props) => {
  const { children, title, link, exact } = props;

  return (
    <li>
      <div className={classes.NavItem}>
        <NavLink
          to={link}
          exact={exact}
          activeClassName={classes.NavItem__active}
        >
          <div className={classes.NavItem__icon}>{children}</div>
        </NavLink>
        <div className={classes.NavItem__title}>{title}</div>
      </div>
    </li>
  );
};

navItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default navItem;
