//Import libraries
import React from 'react';

//Import components
import BackDrop from '../BackDrop/BackDrop';

//Import scoped class modules
import classes from './Modal.module.scss';

//Stateless component
const modal = ({ children, click }) => (
    <>
        <BackDrop click={click} />
        <div className={classes.Modal}>{children}</div>
    </>
);

export default modal;