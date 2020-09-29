//Import libraries
import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Import components
import Button from "../../UI/AuthButton/AuthButton";
// import Spinner from "../../UI/Spinner/Spinner";
import Spinner from "../../UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./RecoverPassword.module.scss";

// Import actions
import * as actions from "../../../store/actions";

//Stateless component
const RecoverPassword = ({
  clicked,
  errors,
  touched,
  isSubmitting,
  isValid,
  error,
  loading,
  cleanUp,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);

  // Check the validity of the input to scroll down the error
  const checkValidity = (error, touched) => {
    const errorMessageElement = [classes.RecoverPassword__paragraph];
    if (error && touched)
      errorMessageElement.push(classes.RecoverPassword__paragraph_show);
    return errorMessageElement.join(" ");
  };

  // Check the validity of the input to change the border bottom of the element
  const checkInputValidity = (error, touched) => {
    const inputClasses = [classes.RecoverPassword__input];
    if (error && touched) {
      inputClasses.push(classes.RecoverPassword__input_Invalid);
    } else if (!error && touched) {
      inputClasses.push(classes.RecoverPassword__input_Valid);
    }
    return inputClasses.join(" ");
  };

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error}</p>;
  }

  // Default content to be rendered
  let content = (
    <>
      <Form className={classes.RecoverPassword}>
        {errorMessage}
        <div>
          <label className={classes.RecoverPassword__label}>Email</label>
          <Field
            className={checkInputValidity(errors.email, touched.email)}
            type="email"
            name="email"
            placeholder="Introduce your email here..."
          />
          {/* Check if the email is touched and if the email have an error on the Formik object. Error caught by Yup */}
          {/* Passing an empty space to the element if dont detect an error to force empty space */}
          <p className={checkValidity(errors.email, touched.email)}>
            {errors.email ? errors.email : "&bnsp;"}
          </p>
        </div>

        <Button value={"Submit"} disabled={!isValid || isSubmitting} submit />
      </Form>
      <Button value={"Login"} changed={clicked} />
    </>
  );

  if (loading) {
    content = <Spinner />;
  }

  return (
    <>
      <h2>Recover Password</h2>
      {content}
    </>
  );
};

RecoverPassword.propTypes = {
  clicked: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  loading: PropTypes.bool.isRequired,
};

const formikApp = withFormik({
  // Values that will be passed to the props for the form. The value will be attributed accordingly to the object name
  mapPropsToValues: ({ email }) => {
    return {
      email: email || "",
    };
  },
  isInitialValid: false,
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid! Please introduce a valid email...")
      .required("Email is required to login!"),
  }),
  handleSubmit: async (
    values,
    { props, resetForm, setErrors, setSubmitting }
  ) => {
    // Reset the form
    resetForm();
    // Call the action to perform a firebase login
    try {
      await props.recoverPassword(values.email);
    } catch (e) {
      setSubmitting(false);
    }
  },
})(RecoverPassword);

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recoverPassword: (email) => dispatch(actions.recoverPassword(email)),
    cleanUp: () => dispatch(actions.cleanUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikApp);
