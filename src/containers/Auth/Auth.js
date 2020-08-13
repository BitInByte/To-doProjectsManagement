//Import libraries
import React, { useState } from 'react';

//Import components
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

//Import scoped class modules
import classes from './Auth.module.scss';

//Stateless component
const Auth = ({ children }) => {

    const [isLogin, setIsLogin] = useState(true);

    const auth = isLogin ? <Login clicked={() => setIsLogin(!isLogin)} /> : <Signup clicked={() => setIsLogin(!isLogin)} />;

    return (
        <div className={classes.Auth}>
            {auth}
        </div>
    );
};

export default Auth;