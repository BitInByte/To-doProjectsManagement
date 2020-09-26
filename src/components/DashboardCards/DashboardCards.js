import React from "react";
import PropTypes from "prop-types";

import classes from "./DashboardCards.module.scss";

// Import utility functions
import { numberReduce } from "../../shared/utility";

const dashboardCards = ({ title, count, archivedCount, completed, label }) => {
  return (
    <div className={classes.DashboardCards}>
      <div className={classes.DashboardCards__content}>
        <div className={classes.DashboardCards__counter}>
          {numberReduce(count)}
        </div>
        {title}
        {completed ? (
          <div className={classes.DashboardCards__archivedCounter}>
            <span>{label}:</span> {numberReduce(archivedCount)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

dashboardCards.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  archivedCount: PropTypes.number,
  completed: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

export default dashboardCards;
