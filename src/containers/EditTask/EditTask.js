//Import libraries
import React, { useState } from "react";
import PropTypes from "prop-types";

//Import components
import Input from "../../components/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";

//Import scoped class modules
import classes from "./EditTask.module.scss";

//Stateless component
const EditTask = ({ submitHandler, data }) => {
  // State to create the form dynamically
  const [editTaskForm, setEditTaskForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Insert your title here...",
      },
      label: "Title",
      value: data.title,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "textarea",
        placeholder: "Insert your description here...",
      },
      label: "Description",
      value: data.desc,
    },
  });

  // Convert the object into an array
  const formElementsArray = [];
  for (let el in editTaskForm) {
    formElementsArray.push({
      id: el,
      config: editTaskForm[el],
    });
  }

  const inputChangedHandler = (event, elementID) => {
    const updateObject = {
      ...editTaskForm,
      [elementID]: {
        ...editTaskForm[elementID],
        value: event.target.value,
      },
    };

    setEditTaskForm(updateObject);
  };

  let form = (
    <form
      onSubmit={(e) =>
        submitHandler(e, data.id, {
          title: editTaskForm.title.value,
          desc: editTaskForm.description.value,
        })
      }
      className={classes.AddNew}
    >
      {formElementsArray.map((element, index) => (
        <Input
          key={index}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          label={element.config.label}
          changed={(event) => inputChangedHandler(event, element.id)}
        />
      ))}
      <Button name="Submit" />
    </form>
  );

  return <div className={classes.EditTask}>{form}</div>;
};

EditTask.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditTask;
