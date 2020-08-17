//Import libraries
import React, { useState } from 'react';

//Import components
import Input from '../../components/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';

// Import shared utilities
// import { checkValidity } from '../../shared/utility';

//Import scoped class modules
import classes from './EditTask.module.scss';

//Stateless component
const EditTask = ({ submitHandler, data }) => {

    // State to create the forn dynamically
    const [editTaskForm, setEditTaskForm] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Insert your title here...',
            },
            label: 'Title',
            value: data.title,
            // validation: {
            //     required: false,
            // },
            // isValid: false,
            // touched: false,
            // errorMessage: 'You should enter a valid Title!',
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Insert your description here...',
            },
            label: 'Description',
            value: data.desc,
            // validation: {
            // required: false,
            // },
            // isValid: false,
            // touched: false,
            // errorMessage: 'You should enter a valid description!',
        },
    });

    // State to check when the form is valid or not
    // const [formIsValid, setFormIsValid] = useState(false);

    // Convert the object into an array
    const formElementsArray = [];
    for (let el in editTaskForm) {
        formElementsArray.push({
            id: el,
            config: editTaskForm[el],
        });
    };

    const inputChangedHandler = (event, elementID) => {

        const updateObject = {
            ...editTaskForm,
            [elementID]: {
                ...editTaskForm[elementID],
                // isValid: checkValidity(event.target.value, editTaskForm[elementID].validation),
                value: event.target.value,
                // touched: true,
            }
        };

        // let formIsVal = true;
        // for (let inputIdentifier in updateObject) {
        //     formIsVal = updateObject[inputIdentifier].isValid && formIsVal;
        // };

        // setFormIsValid(formIsVal);

        setEditTaskForm(updateObject);
        // console.log(updateObject);
    };

    let form = (
        <form onSubmit={(e) => submitHandler(e, data.id, { title: editTaskForm.title.value, desc: editTaskForm.description.value })} className={classes.AddNew}>
            {formElementsArray.map((element, index) => (
                <Input
                    key={index}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    label={element.config.label}
                    // invalid={!element.config.isValid}
                    // shouldValidate={element.config.validation}
                    changed={(event) => inputChangedHandler(event, element.id)}
                // errorMessage={element.config.errorMessage}
                // touched={element.config.touched}
                />
            ))}
            <Button name="Submit" />
        </form>
    );

    // let errorMessage = null;
    // if (error) {
    //     errorMessage = (
    //         <p>{error.message}</p>
    //     );
    // };





    return (
        <div className={classes.EditTask}>
            {/* {errorMessage} */}
            {form}
        </div>
    );

};

export default EditTask;