//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./VerifyEmail.module.scss";

//Stateless component
const verifyEmail = ({ resendEmail }) => (
  <>
    <p className={classes.VerifyEmail__paragraph}>
      You should verify your email before starting using the app! Checkout on
      your email the link to verify! Don't forget to check the spam box!
    </p>
    <p className={classes.VerifyEmail__paragraph}>
      If you didn't received an email,{" "}
      <span className={classes.VerifyEmail__link} onClick={resendEmail}>
        click here
      </span>{" "}
      to re-send the email again!
    </p>
  </>
);

verifyEmail.propTypes = {
  resendEmail: PropTypes.func,
};

export default verifyEmail;
