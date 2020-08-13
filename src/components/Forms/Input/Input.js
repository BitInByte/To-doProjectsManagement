//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Input.module.scss';

//Stateless component
const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) inputClasses.push(classes.Invalid);
    if (!props.invalid && props.shouldValidate && props.touched) inputClasses.push(classes.Valid);

    let errorMessageElement = [classes.Paragraph];
    if (props.invalid && props.touched) errorMessageElement.push(classes.ParagraphShow);

    switch (props.elementType) {
        case ('input'):
            inputElement = <input value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select value={props.value} className={inputClasses.join(' ')} onChange={props.changed} >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input value={props.value} className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <p className={errorMessageElement.join(' ')}>{props.errorMessage}</p>
        </div>
    );
};

export default input;