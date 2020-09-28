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

  if (titleArray.length > 25) {
    return `${titleArray.slice(0, 22).join("")}...`;
  } else {
    return titleArray.join("");
  }
};

export const mobileDataManipulation = (data, newData, group, itemID) => {
  let storedItem;
  data.forEach((item, index) => {
    if (item.title === group) {
      // Storing the removed element into a variable
      storedItem = newData[index].items.filter((el) => el.taskNr === itemID);
      // Removing the element from the array
      newData[index].items = newData[index].items.filter(
        (el) => el.taskNr !== itemID
      );

      let indexNewData = index;
      if (indexNewData === 2) {
        indexNewData = 0;
      } else {
        indexNewData += 1;
      }

      newData[indexNewData].items.push(storedItem[0]);
    }
  });
};

export const numberReduce = (count) => {
  if (count > 99) {
    return "+99";
  } else {
    return count.toString();
  }
};
