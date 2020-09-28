//Import libraries
import React, { useState, useRef } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Title from "../../components/UI/Title/Title";
import ToDo from "../../components/ToDo/ToDo";
import Controllers from "../../components/Controllers/Controllers";
import Modal from "../../components/UI/Modal/Modal";
import AddNew from "../AddNew/AddNew";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./Project.module.scss";

import * as actions from "../../store/actions";

// Import utilities
import { titleReduce, mobileDataManipulation } from "../../shared/utility";

//Stateless component
const Project = ({ match, updateTask, project, archiveProject, history }) => {
  // State to create the form dynamically
  const [addNewForm, setAddNewForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Insert your title here...",
      },
      label: "Title",
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
      errorMessage: "You should enter a valid Title!",
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "textarea",
        placeholder: "Insert your description here...",
      },
      label: "Description",
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
      errorMessage: "You should enter a valid description!",
    },
  });

  const [dragging, setDragging] = useState(false);

  // Perform an action on click to open the add new modal
  const [openAddNewModal, setOpenAddNewModal] = useState(false);

  // Perform an action on click to open the Archive modal
  const [openArchiveModal, setOpenArchiveModal] = useState(false);

  // Reference to hold the item when drag starts
  const dragItem = useRef();

  // Reference to hold the specific node that is moving
  const dragNode = useRef();

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  // Check if the firebase fetch is complete
  if (!isLoaded(project)) {
    return <Spinner />;
  } else if ((isLoaded(project) || !isEmpty(project)) && project.isClosed) {
    return <Redirect to="/" />;
  } else {
    let closedRedirect = null;
    const title = titleReduce(project.projectName);

    let data = JSON.parse(JSON.stringify(project.data));

    const handleDragStart = (e, params) => {
      // We receive the board, the event and the item id
      // Store the item on the reference
      dragItem.current = params;
      // console.log(dragItem);
      // Get the current Node
      dragNode.current = e.target;
      // Set an eventListener to the node
      dragNode.current.addEventListener("dragend", handleDragEnd);
      // Apply the style to the element on the board and not to the element
      // dragging
      setTimeout(() => {
        // Set the dragging variable to true
        setDragging(true);
      }, 0);
    };

    const handleDragEnter = (e, params) => {
      e.preventDefault();
      const currentItem = dragItem.current;
      if (e.target !== dragNode.current) {
        // If is not the same element we are entering, then apply it

        // Deeply create a new state with the old state instead of a reference
        let newList = JSON.parse(JSON.stringify(data));
        // Change the item position on the data
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        // Store the new params on the reference
        dragItem.current = params;
        // Return the new list to be stored

        updateTask(newList, projectId);
      }
    };

    const handleDragEnd = (e) => {
      e.preventDefault();
      // Resetting the references
      setDragging(false);
      dragNode.current.removeEventListener("dragend", handleDragEnd);
      dragItem.current = null;
      dragNode.current = null;
    };

    const getStyles = (params) => {
      // Get the current drag item
      const currentItem = dragItem.current;
      if (
        currentItem.grpI === params.grpI &&
        currentItem.itemI === params.itemI
      ) {
        return true;
      }
    };

    // Submit form handler
    const submitButtonHandler = (e, newData) => {
      e.preventDefault();
      let count = 0;
      // data.map((item) => {
      data.forEach((item) => {
        count += item.items.length;
      });
      // Push to the state here
      data[0].items.push({
        title: newData.title.value,
        desc: newData.description.value,
        date: new Date(),
        taskNr: count,
      });

      // Update the firebase
      updateTask(data, projectId);

      // Close the form
      setOpenAddNewModal(false);
      setAddNewForm({
        ...addNewForm,
        title: {
          ...addNewForm.title,
          value: "",
          touched: false,
        },
        description: {
          ...addNewForm.description,
          value: "",
          touched: false,
        },
      });
    };

    // Archive the project handler
    const submitArchiveHandler = (e) => {
      archiveProject(projectId);
      setOpenArchiveModal(false);
    };

    // Mobile click
    const mobileClickHandler = (event, group, itemID) => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        let newData = JSON.parse(JSON.stringify(data));
        if (group === "Tasks") {
          mobileDataManipulation(data, newData, group, itemID);
        } else if (group === "Progress") {
          mobileDataManipulation(data, newData, group, itemID);
        } else if (group === "Completed") {
          mobileDataManipulation(data, newData, group, itemID);
        }

        updateTask(newData, projectId);
      }
    };

    let modal = null;
    if (openAddNewModal) {
      modal = (
        <div className={classes.Modal}>
          <Modal
            click={() => setOpenAddNewModal(false)}
            modalOpen={openAddNewModal}
          >
            <div className={classes.Modal__content}>
              <h2>Add a new Task</h2>
              <AddNew
                submitHandler={submitButtonHandler}
                data={addNewForm}
                setData={setAddNewForm}
              />
            </div>
          </Modal>
        </div>
      );
    } else if (openArchiveModal) {
      modal = (
        <div className={classes.Modal}>
          <Modal
            click={() => setOpenArchiveModal(false)}
            modalOpen={openArchiveModal}
          >
            <div className={classes.Modal__archive}>
              <h2>Archive</h2>
              <p>Are you sure you want to archive this project?</p>
              <p>
                All of the project data will be lost and you cannot undo this
                process!
              </p>
              <div className={classes.Modal__button}>
                <Button name="Confirm" click={submitArchiveHandler} />
              </div>
            </div>
          </Modal>
        </div>
      );
    }

    const { projectId } = match.params;

    return (
      <animated.div style={props} className={classes.Project}>
        {closedRedirect}
        {/* TITLE */}
        <Title title={title} />
        {/* BOARDS */}
        <div className={classes.Project__boards}>
          {data.map((grp, grpI) => (
            <div key={grp.title} className={classes.Board}>
              <h2>{grp.title}</h2>
              <div
                className={classes.Board__wrapper}
                onDragEnter={
                  dragging && !grp.items.length
                    ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                    : null
                }
                // Prevent the element to return back to the initial position after over it
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Make the ToDo draggable */}
                {/* With handleDragStart we pass the event, the item id and the board id */}
                {grp.items.map((item, itemI) => (
                  <ToDo
                    // Should be item index
                    title={item.title}
                    desc={item.desc}
                    clicked={(event) =>
                      mobileClickHandler(event, grp.title, item.taskNr)
                    }
                    isChecked={grp.title === "Completed"}
                    key={item.taskNr}
                    isDraggable={true}
                    dragStart={(e) => handleDragStart(e, { grpI, itemI })}
                    // Happens on the items that accept this events
                    dragEnter={
                      dragging
                        ? (e) => {
                            handleDragEnter(e, { grpI, itemI });
                          }
                        : null
                    }
                    idDragging={dragging}
                    // If is dragging, then change the class
                    hasDragClass={dragging ? getStyles({ grpI, itemI }) : false}
                    onDragOver={(e) => e.preventDefault()}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* CONTROLLERS */}
        <Controllers
          btn1="Add New"
          btn1Click={() => setOpenAddNewModal(!openAddNewModal)}
          btn2="Archive Project"
          btn2Click={() => setOpenArchiveModal(!openArchiveModal)}
        />
        {modal}
      </animated.div>
    );
  }
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  project: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  archiveProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    project: state.firestore.data.projectInfo,
    tasks: state.firestore.data.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (data, projectId) => dispatch(actions.addTask(data, projectId)),
    archiveProject: (projectId) => dispatch(actions.archiveProject(projectId)),
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    // Get all the projects from the firebase
    firestoreConnect((props) => [
      {
        collection: "userData",
        doc: props.userId,
        subcollections: [
          {
            collection: "projects",
            doc: props.match.params.projectId,
          },
        ],
        // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
        storeAs: "projectInfo",
      },

      {
        collection: "userData",
        doc: props.userId,
        subcollections: [
          {
            collection: "projects",
            doc: props.match.params.projectId,
            subcollections: [
              {
                collection: "data",
              },
            ],
          },
        ],
        // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
        storeAs: "tasks",
      },
    ])
  )(Project)
);
