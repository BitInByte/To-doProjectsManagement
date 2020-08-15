//Import libraries
import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

//Import components
import Button from '../../UI/AuthButton/AuthButton';
import Spinner from '../../UI/Spinner/Spinner';

//Import scoped class modules
import classes from './Signup.module.scss';

// Import actions
import * as actions from '../../../store/actions';

//Stateless component
const signup = ({ clicked, values, errors, touched, isSubmitting, isValid, validateOnMount, loading, error }) => {


    // Check the validity of the input to scroll down the error
    const checkValidity = (error, touched) => {
        const errorMessageElement = [classes.Signup__paragraph];
        if (error && touched) errorMessageElement.push(classes.Signup__paragraph_show);
        return errorMessageElement.join(' ')
    };

    // Check the validity of the input to change the border bottom of the element
    const checkInputValidity = (error, touched) => {
        const inputClasses = [classes.Signup__input];
        if (error && touched) {
            inputClasses.push(classes.Signup__input_Invalid);
        } else if (!error && touched) {
            inputClasses.push(classes.Signup__input_Valid);
        };
        return inputClasses.join(' ');
    };

    let errorMessage = null;
    if (error) {
        errorMessage = (
            <p>{error}</p>
        );
    };

    let content = (
        <>
            <Form className={classes.Signup}>
                {errorMessage}
                <div>
                    <label className={classes.Signup__label}>Email</label>
                    <Field className={checkInputValidity(errors.email, touched.email)} type="email" name="email" placeholder="Introduce your email here..." />
                    {/* Check if the email is touched and if the email have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.email, touched.email)} >{errors.email ? errors.email : '&bnsp;'}</p>
                </div>
                <div>
                    <label className={classes.Signup__label}>Password</label>
                    <Field className={checkInputValidity(errors.password, touched.password)} type="password" name="password" placeholder="Introduce your password here..." />
                    {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.password, touched.password)} >{errors.password ? errors.password : '&bnsp;'}</p>
                </div>
                <div>
                    <label className={classes.Signup__label}>Repeat you password</label>
                    <Field className={checkInputValidity(errors.repeatPassword, touched.repeatPassword)} type="password" name="repeatPassword" placeholder="Introduce your password again here..." />
                    {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.repeatPassword, touched.repeatPassword)} >{errors.repeatPassword ? errors.repeatPassword : '&bnsp;'}</p>
                </div>
                <div>
                    <label className={classes.Signup__label}>First name</label>
                    <Field className={checkInputValidity(errors.firstName, touched.firstName)} type="text" name="firstName" placeholder="Introduce your first name here..." />
                    {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.firstName, touched.firstName)} >{errors.firstName ? errors.firstName : '&bnsp;'}</p>
                </div>
                <div>
                    <label className={classes.Signup__label}>Last name</label>
                    <Field className={checkInputValidity(errors.lastName, touched.lastName)} type="password" name="lastName" placeholder="Introduce your last name here..." />
                    {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.lastName, touched.lastName)} >{errors.lastName ? errors.lastName : '&bnsp;'}</p>
                </div>

                <Button value={'Signup'} disabled={!isValid || isSubmitting} />
            </Form>
            <Button value={'Login'} changed={clicked} />
        </>
    );

    // If loading fires true, then render the loader
    if (loading) {
        content = (
            <div className={classes.Signup__spinner}>
                <Spinner />
            </div>
        );
    };

    return (
        <>
            <h2>Signup</h2>
            {content}
        </>
    )
};

const formikApp = withFormik({
    // Values that will be passed to the props for the form. The value will be attributed accordngly to the object name
    mapPropsToValues: ({ email, password, repeatPassword, firstName, lastName }) => {
        return {
            email: email || '',
            password: password || '',
            repeatPassword: repeatPassword || '',
            firstName: firstName || '',
            lastName: lastName || '',
        };
    },
    isInitialValid: false,
    // validateOnMount: true,
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid! Please introduce a valid email...').required('Email is required to login!'),
        password: Yup.string().min(9, 'You password is not valid! Password contains 9 characters or more!').required('Password is required to login!'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Both password must be the same!').required('You should introduce your password again!'),
        firstName: Yup.string().required('You should introduce your first name!'),
        lastName: Yup.string().required('You should introduce your last name!'),
    }),
    handleSubmit: async (values, { props, resetForm, setErrors, setSubmitting }) => {
        // Sign up
        await props.signUp(values);
        // Reset the form
        resetForm();
    },
})(signup);

const mapStateToProps = state => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        error: state.auth.authError,
        loading: state.auth.loading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(actions.signUp(newUser)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(formikApp);