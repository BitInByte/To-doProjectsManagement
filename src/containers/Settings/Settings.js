//Import libraries
import React, { useState } from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import FileInput from "../../components/UI/FileInput/FileInput";
import Error from "../../components/UI/Error/Error";

//Import scoped class modules
import classes from "./Settings.module.scss";

// Import actions
import * as actions from "../../store/actions";

//Stateless component
const Settings = ({
  auth,
  profile,
  values,
  errors,
  touched,
  error,
  authLoading,
  authError,
  deleteUser,
  newImageState,
  newImage,
}) => {
  // Setting state to open the delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  // Check the validity of the input to scroll down the error
  const checkValidity = (error, touched) => {
    const errorMessageElement = [classes.Settings__paragraph];
    if (error && touched)
      errorMessageElement.push(classes.Settings__paragraph_show);
    return errorMessageElement.join(" ");
  };

  // Check the validity of the input to change the border bottom of the element
  const checkInputValidity = (error, touched) => {
    const inputClasses = [classes.Settings__input];
    if (error && touched) {
      inputClasses.push(classes.Settings__input_Invalid);
    } else if (!error && touched) {
      inputClasses.push(classes.Settings__input_Valid);
    }
    return inputClasses.join(" ");
  };

  let errorMessage = null;
  if (error) {
    errorMessage = <Error errorMessage={error} />;
  }

  if (authError) {
    errorMessage = <Error errorMessage={authError} />;
  }

  //   Check if the data is different than on the server to enable button
  const checkButtonDisable = () => {
    let validation = true;

    // Get the length of the object
    if (Object.keys(touched).length === 0) {
      validation = false;
    }

    if (
      touched.firstName &&
      values.firstName &&
      values.firstName !== profile.firstName &&
      validation
    ) {
      validation = true;
    } else if (
      touched.lastName &&
      values.lastName &&
      values.lastName !== profile.lastName &&
      validation
    ) {
      validation = true;
    } else if (
      touched.email &&
      values.email &&
      values.email !== auth.email &&
      validation
    ) {
      validation = true;
    } else if (
      touched.password &&
      touched.repeatPassword &&
      values.password &&
      values.repeatPassword &&
      values.password === values.repeatPassword &&
      validation
    ) {
      validation = true;
    } else if (newImage) {
      validation = true;
    } else {
      validation = false;
    }

    return !validation;
  };

  const fileHandler = (event) => {
    newImageState(event.target.files[0]);
  };

  let img = null;
  const profileClasses = [classes.Settings__profile];
  const formClasses = [classes.Settings__form];
  if (profile.profileImg) {
    profileClasses.push(classes.Settings__profile__imageSpace);
    formClasses.push(classes.Settings__form__imageSpace);
    img = (
      <div className={classes.Settings__profileImage}>
        <img
          className={classes.Settings__profileImg}
          src={profile.profileImg}
          alt={profile.initials}
        />
      </div>
    );
  }

  let content;
  if (profile.isLoaded && !profile.isEmpty) {
    content = (
      <div className={classes.Settings__formContent}>
        {img}

        <Form className={formClasses.join(" ")}>
          {errorMessage}
          <div>
            <label className={classes.Settings__label}>First name</label>
            <Field
              className={checkInputValidity(
                errors.firstName,
                touched.firstName
              )}
              type="text"
              name="firstName"
              placeholder="Introduce your first name here..."
            />
            {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
            {/* Passing an empty space to the element if dont detect an error to force empty space */}
            <p className={checkValidity(errors.firstName, touched.firstName)}>
              {errors.firstName ? errors.firstName : "&bnsp;"}
            </p>
          </div>
          <div>
            <label className={classes.Settings__label}>Last name</label>
            <Field
              className={checkInputValidity(errors.lastName, touched.lastName)}
              type="text"
              name="lastName"
              placeholder="Introduce your last name here..."
            />
            {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
            {/* Passing an empty space to the element if dont detect an error to force empty space */}
            <p className={checkValidity(errors.lastName, touched.lastName)}>
              {errors.lastName ? errors.lastName : "&bnsp;"}
            </p>
          </div>
          <div>
            <label className={classes.Settings__label}>Email</label>
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
          <div>
            <label className={classes.Settings__label}>New password</label>
            <Field
              className={checkInputValidity(errors.password, touched.password)}
              type="password"
              name="password"
              placeholder="Introduce your password here..."
            />
            {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
            {/* Passing an empty space to the element if dont detect an error to force empty space */}
            <p className={checkValidity(errors.password, touched.password)}>
              {errors.password ? errors.password : "&bnsp;"}
            </p>
          </div>
          <div>
            <label className={classes.Settings__label}>
              Repeat your new password
            </label>
            <Field
              className={checkInputValidity(
                errors.repeatPassword,
                touched.repeatPassword
              )}
              type="password"
              name="repeatPassword"
              placeholder="Introduce your password again here..."
            />
            {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
            {/* Passing an empty space to the element if dont detect an error to force empty space */}
            <p
              className={checkValidity(
                errors.repeatPassword,
                touched.repeatPassword
              )}
            >
              {errors.repeatPassword ? errors.repeatPassword : "&bnsp;"}
            </p>
          </div>

          <div>
            <label className={classes.Settings__label}>
              Insert a profile image here:
            </label>
            <FileInput file={newImage} fileHandler={fileHandler} />
          </div>

          <Button name={"Submit"} disabled={checkButtonDisable()} submit />
        </Form>
        <div className={classes.Settings__deleteBtn}>
          <Button
            name={"Delete account"}
            click={() => setOpenDeleteModal(true)}
          />
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.Settings__Spinner}>
        <Spinner color="blue" />
      </div>
    );
  }

  // If the state got loading to true, fire the spinner
  if (authLoading)
    content = (
      <div className={classes.Settings__Spinner}>
        <Spinner color="blue" />
      </div>
    );

  const deleteUserHandler = () => {
    setOpenDeleteModal(false);
    deleteUser();
  };

  let modal = null;
  if (openDeleteModal) {
    modal = (
      <Modal
        click={() => setOpenDeleteModal(false)}
        modalOpen={openDeleteModal}
      >
        <div className={classes.Settings__modal}>
          <h2>Delete Account</h2>
          <p>Are you sure you want to delete this account?</p>
          <p>All of your data will be lost and you cannot undo this process!</p>
          <div
            className={(classes.Modal__button, classes.Settings__modal_button)}
          >
            <Button name="Confirm" click={deleteUserHandler} />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <animated.div style={props} className={classes.Settings}>
        <Title title="Settings" />
        <div className={profileClasses.join(" ")}>{content}</div>
      </animated.div>
      {modal}
    </>
  );
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  authLoading: PropTypes.bool.isRequired,
  authError: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  deleteUser: PropTypes.func.isRequired,
  newImageState: PropTypes.func.isRequired,
  newImage: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
};

const formikApp = withFormik({
  enableReinitialize: true,
  // Values that will be passed to the props for the form. The value will be attributed accordngly to the object name
  mapPropsToValues: ({
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
    profile,
    auth,
  }) => {
    return {
      // Get the user profile as props but add '' to avoid yelling an error because is forcing to update the formik without nothing when
      // The data is not fetched yet
      // Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa)

      email: email || auth.email || "",
      password: password || "",
      repeatPassword: repeatPassword || "",
      firstName: firstName || profile.firstName || "",
      lastName: lastName || profile.lastName || "",
    };
  },
  isInitialValid: false,
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid! Please introduce a valid email...")
      .required("Email is required to login!"),
    password: Yup.string().min(
      9,
      "You password is not valid! Password contains 9 characters or more!"
    ),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Both password must be the same!"
    ),
    firstName: Yup.string().required("You should introduce your first name!"),
    lastName: Yup.string().required("You should introduce your last name!"),
  }),
  handleSubmit: async (
    values,
    { props, resetForm, setErrors, setSubmitting }
  ) => {
    // Build the data to be fetched on the server
    const { profile, auth, newImage } = props;
    let data = {};
    if (
      values.firstName !== profile.firstName ||
      values.lastName !== profile.lastName
    ) {
      data = {
        ...data,
        firstName: values.firstName,
        lastName: values.lastName,
      };
    }

    if (values.email !== auth.email) {
      data = {
        ...data,
        email: values.email,
      };
    }

    if (values.password) {
      data = {
        ...data,
        password: values.password,
      };
    }

    if (newImage) {
      data = {
        ...data,
        image: newImage,
      };
    }

    // Set submitting to true when we are making an async action to disable the button
    setSubmitting(true);
    // Reset the form
    resetForm();
    // Sign up
    await props.changeProfile(data);
  },
})(Settings);

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    authLoading: state.auth.loading,
    authError: state.auth.authError,
    newImage: state.auth.newImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (data) => dispatch(actions.changeProfile(data)),
    deleteUser: () => dispatch(actions.deleteAccount()),
    newImageState: (data) => dispatch(actions.addNewImageReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikApp);
