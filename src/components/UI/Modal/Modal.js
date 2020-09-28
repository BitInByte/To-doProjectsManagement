//Import libraries
import React from "react";
import { useTransition, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import BackDrop from "../BackDrop/BackDrop";

//Import scoped class modules
import classes from "./Modal.module.scss";

//Stateless component
const Modal = ({ children, click, modalOpen }) => {
  const transitions = useTransition(modalOpen, null, {
    from: {
      opacity: 0,
      top: "30%",
    },
    enter: { opacity: 1, top: "50%" },
    leave: { opacity: 0, top: "30%" },
    reset: true,
  });

  return (
    <>
      <BackDrop click={click} />

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={classes.Modal}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  click: PropTypes.func.isRequired,
  modalOpen: PropTypes.oneOfType([
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    PropTypes.bool.isRequired,
  ]),
};

export default Modal;
