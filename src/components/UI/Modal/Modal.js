//Import libraries
import React from "react";
import { CSSTransition } from "react-transition-group";

//Import components
import BackDrop from "../BackDrop/BackDrop";

//Import scoped class modules
import classes from "./Modal.module.scss";

//Stateless component
const modal = ({ children, click, modalOpen }) => (
  <>
    <BackDrop click={click} />
    <CSSTransition
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
    >
      <div className={classes.Modal}>{children}</div>
    </CSSTransition>
  </>
);

export default modal;
