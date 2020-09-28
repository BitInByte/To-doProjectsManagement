//Import libraries
import React, { useEffect, useState } from "react";
import { isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Import components
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";
import Title from "../../components/UI/Title/Title";
import Cards from "../../components/DashboardCards/DashboardCards";
import Clock from "../../components/Clock/Clock";

//Import scoped class modules
import classes from "./Dashboard.module.scss";

//Stateless component
const Dashboard = ({ profile, auth }) => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch(
      `https://us-central1-todo-6eb5f.cloudfunctions.net/getDashboardCount?uid=${auth.uid}`
    ).then((resp) => {
      resp.json().then((data) => {
        setDashboard(data);
      });
    });
  };

  const today = new Date();

  if (!isLoaded(profile)) {
    return <Spinner />;
  } else {
    return (
      <div className={classes.Dashboard}>
        <Title title="Dashboard" />
        <h3>
          Hello {profile.firstName} {profile.lastName},
        </h3>
        <Clock />
        <p>
          Today is {today.toDateString()}, and this is your Projects status:
        </p>
        <div className={classes.Dashboard__cards}>
          {dashboard ? (
            <>
              <Cards
                title="ToDos"
                count={dashboard.todos}
                archivedCount={dashboard.todosDone}
                label="Completed"
                completed
              />
              <Cards
                title="Projects"
                archivedCount={dashboard.projects}
                count={dashboard.projects - dashboard.projectsDone}
                label="Total"
                completed
              />
              <Cards
                title="Archived"
                count={dashboard.projectsDone}
                completed={false}
              />
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
};

Dashboard.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  auth: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
