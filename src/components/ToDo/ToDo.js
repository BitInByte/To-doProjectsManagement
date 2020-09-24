//Import libraries
import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Checkbox from "../UI/Checkbox/Checkbox.js";

//Import scoped class modules
import classes from "./ToDo.module.scss";

//Stateless component
const ToDo = ({
  click,
  isChecked,
  hasCheckbox,
  isDraggable,
  dragStart,
  hasDragClass,
  dragEnter,
  title,
  date,
  clicked,
  hasCursor,
  desc,
}) => {
  const todoClass = [classes.ToDo];
  if (hasDragClass) todoClass.push(classes.ToDo__current);
  if (hasCursor) todoClass.push(classes.ToDo__Cursor);

  // const checkElement = (event) => {
  //     console.log('CHECK ELEMENT');
  //     console.log(event.currentTarget.className);
  //     console.log(classes.ToDo);
  //     if (event.currentTarget.className === classes.ToDo) return clicked();
  // };

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
    // reset: true,
  });

  return (
    <animated.div
      style={props}
      className={
        hasDragClass
          ? [classes.ToDo, classes.ToDo__current].join(" ")
          : classes.ToDo
      }
      draggable={isDraggable}
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onClick={clicked}
    >
      <div className={classes.ToDo__content}>
        <h3
          className={
            isChecked
              ? [classes.ToDo__title, classes.ToDo__checked].join(" ")
              : classes.ToDo__title
          }
        >
          {title}
        </h3>
        <p
          className={
            isChecked
              ? [classes.ToDo__timestamp, classes.ToDo__checked].join(" ")
              : classes.ToDo__timestamp
          }
        >
          {date}
        </p>
        {/* <p className={isChecked ? classes.ToDo__checked : null}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, pariatur necessitatibus nobis explicabo voluptate expedita esse ratione voluptatibus! Consequatur nulla sint earum inventore iste eius dolores incidunt voluptatibus tenetur nihil!</p> */}
        <p className={isChecked ? classes.ToDo__checked : null}>{desc}</p>
      </div>

      {/* <div>
                <input type="checkbox" id="Check3" />
                <label htmlFor="Check3">Check</label>
            </div> */}
      {hasCheckbox ? (
        <div className={classes.ToDo__controller}>
          <Checkbox click={click} isChecked={isChecked} />
        </div>
      ) : null}
    </animated.div>
  );
};

ToDo.propTypes = {
  click: PropTypes.func,
  isChecked: PropTypes.bool.isRequired,
  hasCheckbox: PropTypes.bool.isRequired,
  isDraggable: PropTypes.bool.isRequired,
  dragStart: PropTypes.func,
  dragEnter: PropTypes.func,
  hasDragClass: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  clicked: PropTypes.func,
  hasCursor: PropTypes.bool.isRequired,
  desc: PropTypes.string,
};

ToDo.defaultProps = {
  isChecked: false,
  hasCheckbox: false,
  isDraggable: false,
  dragStart: undefined,
  dragEnter: undefined,
  hasDragClass: false,
  clicked: undefined,
  hasCursor: false,
};

export default ToDo;
