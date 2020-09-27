//Import libraries
import React from "react";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Input.module.scss";

//Stateless component
const input = (props) => {
  console.log("@@@@element config");
  console.log(props.elementConfig);

  let inputElement = null;
  // let textAreaElement = null;

  const inputClasses = [classes.InputElement];
  const textAreaElement = [classes.Textarea];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    textAreaElement.push(classes.Invalid);
  }

  if (!props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Valid);
    textAreaElement.push(classes.Valid);
  }

  let errorMessageElement = [classes.Paragraph];
  if (props.invalid && props.touched)
    errorMessageElement.push(classes.ParagraphShow);

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          value={props.value}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          value={props.value}
          className={textAreaElement.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.value}
          className={inputClasses.join(" ")}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          value={props.value}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      <p className={errorMessageElement.join(" ")}>{props.errorMessage}</p>
    </div>
  );
};

input.propTypes = {
  shouldValidate: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  elementConfig: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

export default input;
