//Import libraries
import React, { useState } from "react";
import PropTypes from "prop-types";

//Import components
import Input from "../../components/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";

// Import shared utilities
import { checkValidity } from "../../shared/utility";

//Import scoped class modules
import classes from "./AddNew.module.scss";

//Stateless component
const AddNew = ({ submitHandler, data, setData }) => {
  // State to check when the form is valid or not
  const [formIsValid, setFormIsValid] = useState(false);

  // Convert the object into an array
  const formElementsArray = [];
  for (let el in data) {
    formElementsArray.push({
      id: el,
      config: data[el],
    });
  }

  const inputChangedHandler = (event, elementID) => {
    const updateObject = {
      ...data,
      [elementID]: {
        ...data[elementID],
        isValid: checkValidity(event.target.value, data[elementID].validation),
        value: event.target.value,
        touched: true,
      },
    };

    let formIsVal = true;
    for (let inputIdentifier in updateObject) {
      formIsVal = updateObject[inputIdentifier].isValid && formIsVal;
    }

    setFormIsValid(formIsVal);

    setData(updateObject);
  };

  let form = (
    <form onSubmit={(e) => submitHandler(e, data)} className={classes.AddNew}>
      {formElementsArray.map((element, index) => (
        <Input
          key={index}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          label={element.config.label}
          invalid={!element.config.isValid}
          shouldValidate={element.config.validation}
          changed={(event) => inputChangedHandler(event, element.id)}
          errorMessage={element.config.errorMessage}
          touched={element.config.touched}
        />
      ))}
      <Button name="Submit" disabled={!formIsValid} />
    </form>
  );

  return <>{form}</>;
};

AddNew.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default AddNew;
