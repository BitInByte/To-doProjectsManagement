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
  console.log("MODALOPEN");
  console.log(modalOpen);
  // const [show, set] = useState(false)
  const transitions = useTransition(modalOpen, null, {
    from: {
      opacity: 0,
      top: "30%",
    },
    enter: { opacity: 1, top: "50%" },
    leave: { opacity: 0, top: "30%" },
    reset: true,
  });
  // return transitions.map(({ item, key, props }) =>
  // item && <animated.div key={key} style={props}>✌️</animated.div>
  // )

  return (
    <>
      <BackDrop click={click} />
      {/* <CSSTransition
      in={modalOpen}
      timeout={6000}
      mountOnEnter
      onEnter={console.log("ENTERED FIRED")}
      onEntered={console.log("ENTERED DONE")}
      onEntering={console.log("ENTERING")}
      classNames={{
        enter: classes.Enter,
        enterActive: classes.EnterActive,
        // enter: classes.ModalAnimatedEnter,
        // enterActive: classes.ModalAnimatedEnterActive,
        exit: classes.Modal__animated_exit,
        exitActive: classes.Modal__animated_exitActive,
      }}
      //   classNames={classes.Modal__animated}
    // > */}
      {/* <div className={classes.Modal}>{children}</div> */}
      {/* </CSSTransition> */}
      {/* <div className={classes.Modal__wrapper}> */}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={classes.Modal}>
              {children}
            </animated.div>
          )
      )}
      {/* </div> */}
      {/* <div className={classes.Modal__wrapper}>
        <div className={classes.Modal}>{children}</div>
      </div> */}
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
