//Import libraries
import React from "react";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Import components
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";
import Title from "../../components/UI/Title/Title";
import Cards from "../../components/DashboardCards/DashboardCards";

//Import scoped class modules
import classes from "./Dashboard.module.scss";

//Stateless component
const Dashboard = ({ profile }) => {
  console.log("@@@@DASHBOARD");
  console.log(profile);

  const today = new Date();
  console.log(today);

  if (!isLoaded(profile)) {
    return <Spinner />;
  } else {
    return (
      <div className={classes.Dashboard}>
        <Title title="Dashboard" />
        <h3>
          Hello {profile.firstName} {profile.lastName},
        </h3>
        <p>
          Today is {today.toDateString()}, and this is your Projects status:
        </p>
        <div className={classes.Dashboard__cards}>
          <Cards title="ToDos" count={5} archivedCount={3} completed />
          <Cards title="Projects" count={105} archivedCount={6} completed />
          <Cards title="Archived" count={15} completed={false} />
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
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    // userData: state.firestore.data,
    // projects: state.firestore.data.projects,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
