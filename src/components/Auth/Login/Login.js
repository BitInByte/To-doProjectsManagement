//Import libraries
import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

//Import components
import Button from '../../UI/AuthButton/AuthButton';

//Import scoped class modules
import classes from './Login.module.scss';

//Stateless component
const login = ({ clicked, values, errors, touched, isSubmitting, isValid, validateOnMount }) => {

    // console.log('Submitting');
    // console.log(isSubmitting);
    // console.log('Valid');
    // console.log(!isValid);

    console.log('Button');
    // console.log(!isValid || isSubmitting);
    // console.log(isValid);
    // console.log(isSubmitting);
    console.log(validateOnMount);

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

    return (
        <>
            <h2>Login</h2>
            <Form className={classes.Login}>
                <div>
                    <label className={classes.Login__label}>Username</label>
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

                <Button value={'Login'} disabled={!isValid || isSubmitting} />
            </Form>
            <Button value={'Forgot my password!'} changed={clicked} />
            <Button value={'Register'} changed={clicked} />
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
    handleSubmit() { },
})(login);

export default formikApp;