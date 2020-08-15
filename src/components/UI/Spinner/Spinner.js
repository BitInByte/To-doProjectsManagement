//Import libraries
import React from 'react';

//Import components
import Spinner from '@material-ui/core/CircularProgress';

//Import scoped class modules
import classes from './Spinner.module.scss';

//Stateless component
const spinner = (props) => (
    <Spinner classes={{ root: classes.Spinner }} />
);

export default spinner;