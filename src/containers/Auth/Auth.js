//Import libraries
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

//Import components
import Login from "../../components/Auth/Login/Login";
import Signup from "../../components/Auth/Signup/Signup";
import VerifyEmail from "../../components/Auth/VerifyEmail/VerifyEmail";

// import actions
import * as actions from "../../store/actions";

//Import scoped class modules
import classes from "./Auth.module.scss";

//Stateless component
const Auth = ({ emailVerified, token, resendEmail }) => {
  console.log("Auth");
  console.log(emailVerified);
  console.log(token);

  const [isLogin, setIsLogin] = useState(true);

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
    reset: true,
  });

  let auth = isLogin ? (
    <Login clicked={() => setIsLogin(!isLogin)} />
  ) : (
    <Signup clicked={() => setIsLogin(!isLogin)} />
  );

  if (!emailVerified && token) {
    auth = <VerifyEmail resendEmail={resendEmail} />;
  }

  if (emailVerified && token) {
    auth = <Redirect to="/" />;
  }

  return (
    <animated.div style={props} className={classes.Auth}>
      {auth}
    </animated.div>
  );
};

Auth.propTypes = {
  emailVerified: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  token: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  resendEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    resendEmail: () => dispatch(actions.resendEmail()),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
