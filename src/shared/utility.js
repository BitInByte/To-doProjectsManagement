// Check if the form is valid
export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    // .trim() remove any white spaces at the beginning or end
    // check if the trim valid is not equal to an empty string
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const titleReduce = (title) => {
  let titleArray;
  titleArray = title.split("");
  //   console.log("@@@TITLE");
  //   console.log(titleArray);

  if (titleArray.length > 25) {
    // titleArray.slice(0, 22);
    // console.log(`${titleArray.slice(0, 22).join("")}...`.split(""));
    return `${titleArray.slice(0, 22).join("")}...`;
  } else {
    return titleArray.join("");
  }
};
