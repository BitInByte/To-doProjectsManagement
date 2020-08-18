//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Cards.module.scss';

//Stateless component
const cards = ({ text, date }) => (
    <div className={classes.Cards}>
        <p>{text}</p>
        <span>{date}</span>
    </div>
);

export default cards;