//Import libraries
import React from 'react';

//Import components
import Button from '../../UI/AuthButton/AuthButton';

//Import scoped class modules
//import classes from './Signup.module.css';

//Stateless component
const signup = ({ clicked }) => (
    <>
        <h2>Signup</h2>
        <Button value={'Login'} changed={clicked} />
    </>
);

export default signup;