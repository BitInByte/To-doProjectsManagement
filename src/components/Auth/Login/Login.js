//Import libraries
import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

//Import components
import Button from '../../UI/AuthButton/AuthButton';
import Spinner from '../../UI/Spinner/Spinner';

//Import scoped class modules
import classes from './Login.module.scss';

// Import actions
import * as actions from '../../../store/actions';

//Stateless component
const login = ({ clicked, values, errors, touched, isSubmitting, isValid, validateOnMount, signIn, error, loading }) => {

    // console.log('Submitting');
    // console.log(isSubmitting);
    // console.log('Valid');
    // console.log(!isValid);

    // console.log('Button');
    // console.log(!isValid || isSubmitting);
    // console.log(isValid);
    // console.log(isSubmitting);
    // console.log(validateOnMount);

    console.log('loading');
    console.log(loading);

    // Check the validity of the input to scroll down the error
    const checkValidity = (error, touched) => {
        const errorMessageElement = [classes.Login__paragraph];
        if (error && touched) errorMessageElement.push(classes.Login__paragraph_show);
        return errorMessageElement.join(' ')
    };

    // Check the validity of the input to change the border bottom of the element
    const checkInputValidity = (error, touched) => {
        const inputClasses = [classes.Login__input];
        if (error && touched) {
            inputClasses.push(classes.Login__input_Invalid);
        } else if (!error && touched) {
            inputClasses.push(classes.Login__input_Valid);
        };
        return inputClasses.join(' ');
    };

    let errorMessage = null;
    if (error) {
        errorMessage = (
            <p>{error}</p>
        );
    };

    // Default content to be rendered
    let content = (
        <>
            <Form className={classes.Login}>
                {errorMessage}
                <div>
                    <label className={classes.Login__label}>Email</label>
                    <Field className={checkInputValidity(errors.email, touched.email)} type="email" name="email" placeholder="Introduce your email here..." />
                    {/* Check if the email is touched and if the email have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.email, touched.email)} >{errors.email ? errors.email : '&bnsp;'}</p>
                </div>
                <div>
                    <label className={classes.Login__label}>Password</label>
                    <Field className={checkInputValidity(errors.password, touched.password)} type="password" name="password" placeholder="Introduce your password here..." />
                    {/* Check if the password is touched and if the password have an error on the Formik object. Error caught by Yup */}
                    {/* Passing an empty space to the element if dont detect an error to force empty space */}
                    <p className={checkValidity(errors.password, touched.password)} >{errors.password ? errors.password : '&bnsp;'}</p>
                </div>

                <Button value={'Login'} disabled={!isValid || isSubmitting} submit />
            </Form>
            <Button value={'Forgot my password!'} changed={clicked} />
            <Button value={'Register'} changed={clicked} />
        </>
    );

    // If loading fires true, then render the loader
    if (loading) {
        content = (
            <div className={classes.Login__spinner}>
                <Spinner />
            </div>
        );
    };

    return (
        <>
            <h2>Login</h2>
            {content}
        </>
    )
};

const formikApp = withFormik({
    // Values that will be passed to the props for the form. The value will be attributed accordngly to the object name
    mapPropsToValues: ({ email, password }) => {
        return {
            email: email || '',
            password: password || '',
        };
    },
    isInitialValid: false,
    // validateOnMount: true,
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid! Please introduce a valid email...').required('Email is required to login!'),
        password: Yup.string().min(9, 'You password is not valid! Password contains 9 characters or more!').required('Password is required to login!'),
    }),
    handleSubmit: async (values, { props, resetForm, setErrors, setSubmitting }) => {
        // console.log('where in');
        // Call the action to perform a firebase login
        await props.signIn(values);
        // Reset the form
        resetForm();
    },

})(login);

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
        signIn: (creds) => dispatch(actions.signIn(creds)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(formikApp);