//Import libraries
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Import components

// Import actions
import * as actions from "../../../store/actions";

//Stateless component
const Logout = ({ logOut }) => {
  useEffect(() => {
    logOut();
  }, [logOut]);

  return null;
};

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(actions.signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
