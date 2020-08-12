//Import libraries
import React from 'react';

//Import components
import ToDo from '../ToDo/ToDo';

//Import scoped class modules
import classes from './Board.module.scss';

//Stateless component
const board = ({ title }) => {
    return (
        <div className={classes.Board}>
            <h2>{title}</h2>
            <div className={classes.Board__wrapper}>
                <ToDo />
                <ToDo />
                <ToDo />
                <ToDo />

            </div>
        </div>
    );
};

export default board;