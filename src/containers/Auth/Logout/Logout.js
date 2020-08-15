//Import libraries
import { useEffect } from 'react';
import { connect } from 'react-redux';

//Import components

// Import actions
import * as actions from '../../../store/actions';

//Import scoped class modules
//import classes from './Logout.module.css';

//Stateless component
const Logout = ({ logOut }) => {

    useEffect(() => {
        logOut();
    }, [logOut])

    return null;
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.signOut()),
    }
};

export default connect(null, mapDispatchToProps)(Logout);