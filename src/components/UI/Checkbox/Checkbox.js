//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Checkbox.module.scss';

//Stateless component
const checkbox = ({ click, isChecked }) => {

    // const clickHandle = (event) => {
    //     click();
    //     event.stopPropagation();
    // };

    return (
        // <div className={classes.Checkbox}>
        //     <input type="checkbox" id="Check3" className={classes.Checkbox__input} />
        //     <label htmlFor="check3" className={classes.Checkbox__label} />
        // </div>
        <label className={classes.Checkbox}>
            <input type='checkbox' className={classes.Checkbox__input} onClick={(event) => event.stopPropagation()} onChange={click} checked={isChecked} />
            <span className={classes.Checkbox__box} ></span>
        </label>
    )
};

export default checkbox;