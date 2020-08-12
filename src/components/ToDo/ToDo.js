//Import libraries
import React from 'react';

//Import components
import Checkbox from '../UI/Checkbox/Checkbox.js';

//Import scoped class modules
import classes from './ToDo.module.scss';

//Stateless component
const toDo = ({ click, isChecked, hasChecbox }) => (
    <div className={classes.ToDo}>
        <div className={classes.ToDo__content}>
            <h3 className={isChecked ? [classes.ToDo__title, classes.ToDo__checked].join(' ') : classes.ToDo__title}>ToDo</h3>
            <p className={isChecked ? [classes.ToDo__timestamp, classes.ToDo__checked].join(' ') : classes.ToDo__timestamp}>Today</p>
            <p className={isChecked ? classes.ToDo__checked : null}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, pariatur necessitatibus nobis explicabo voluptate expedita esse ratione voluptatibus! Consequatur nulla sint earum inventore iste eius dolores incidunt voluptatibus tenetur nihil!</p>
        </div>

        {/* <div>
                <input type="checkbox" id="Check3" />
                <label htmlFor="Check3">Check</label>
            </div> */}
        {hasChecbox ? <div className={classes.ToDo__controller}><Checkbox click={click} isChecked={isChecked} /></div> : null}


    </div>
);

export default toDo;