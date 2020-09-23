//Import libraries
import React, { useState, useRef } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
// import moment from "moment";
import { useSpring, animated } from "react-spring";

//Import components
import Title from "../../components/UI/Title/Title";
// import Board from '../Board/Board';
import ToDo from "../../components/ToDo/ToDo";
import Controllers from "../../components/Controllers/Controllers";
import Modal from "../../components/UI/Modal/Modal";
// import Input from '../../components/Forms/Input/Input';
import AddNew from "../AddNew/AddNew";
import Button from "../../components/UI/Button/Button";
// import Spinner from "../../components/UI/Spinner/Spinner";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./Project.module.scss";

import * as actions from "../../store/actions";

// Import utilities
import { titleReduce } from "../../shared/utility";

//Stateless component
const Project = ({
  match,
  projectDone,
  projectProgress,
  projectTasks,
  updateTask,
  project,
  tasks,
  archiveProject,
}) => {
  console.log("PROJECT BASIS");
  console.log(project);
  console.log(isLoaded(project));
  console.log(isEmpty());
  // console.log(project.data);
  // console.log(projectDone);
  // console.log(projectProgress);
  // console.log(projectTasks);
  // console.log(projectInfo);
  // const { projectName } = projectInfo;
  // console.log(projectName);

  // const [list, setList] = useState([]);

  // State to create the forn dynamically
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
    // reset: true,
  });

  // Check if the firebase fetch is complete
  if (!isLoaded(project) || isEmpty(project)) {
    // return <h2>Loading...</h2>;
    return (
      // <div className={classes.Project__spinner}>
      <Spinner />
      // </div>
    );
  } else {
    let closedRedirect = null;
    // Router Guarding
    if (project.isClosed) {
      console.log("Is closed, forwarding now...");
      // closedRedirect = <Redirect to='/' />;
      return <Redirect to="/" />;
    }

    console.log("IS CLOSED");
    console.log(project.isClosed);
    const title = titleReduce(project.projectName);

    let data = JSON.parse(JSON.stringify(project.data));
    console.log("DATA");
    console.log(data);
    // let count = 0;
    // data.map((item) => {
    //   console.log(item);
    //   count += item.items.length;
    // });
    // for (let item in data) {
    //   console.log(item);
    //   // count = item.items.length;
    // }
    console.log("@@@@@@COUNT ITEMS");
    // console.log(count);
    // list.push(data);

    // This will be changed with the data came from the server and useState will be converted
    // To the data from the serve
    // setList(project.data);
    // const [list, setList] = useState([]);
    // if (tasks) {
    //     // setList(tasks);

    // }
    // console.log('LIST');
    // console.log(list);

    const handleDragStart = (e, params) => {
      // We receive the board, the event and the item id
      console.log("drag starting...", params);
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
        // Set the darring variable to true
        setDragging(true);
      }, 0);
    };

    const handleDragEnter = (e, params) => {
      e.preventDefault();
      console.log("Entering drag...", params);
      console.log(params);
      console.log("dragNode...", dragNode.current);
      const currentItem = dragItem.current;
      if (e.target !== dragNode.current) {
        // If is not the same element we are entering, then apply it
        console.log("TARGET IS NOT THE SAME!");
        // setList(oldList => {
        //     // Deeply create a new state with the old state instead of a reference
        //     let newList = JSON.parse(JSON.stringify(oldList));
        //     // Change the item position on the data
        //     console.log('HANDLEDRAGENTER');
        //     console.log(params);
        //     console.log(params.grpI);
        //     console.log(newList[params.grpI]);
        //     newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]);
        //     // Store the new params on the reference
        //     dragItem.current = params;
        //     // Return the new list to be stored
        //     return newList;
        // });

        // Deeply create a new state with the old state instead of a reference
        let newList = JSON.parse(JSON.stringify(data));
        // Change the item position on the data
        console.log("HANDLEDRAGENTER");
        console.log(params);
        console.log(params.grpI);
        console.log(newList[params.grpI]);
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        // Store the new params on the reference
        dragItem.current = params;
        // Return the new list to be stored
        // data = newList;
        // console.log('NEWLIST');
        // console.log(newList);
        updateTask(newList, projectId);
      }
    };

    const handleDragEnd = (e) => {
      e.preventDefault();
      console.log("Ending drag");
      // Reseting the references
      setDragging(false);
      dragNode.current.removeEventListener("dragend", handleDragEnd);
      dragItem.current = null;
      dragNode.current = null;
    };

    const getStyles = (params) => {
      // Get the current draga item
      const currentItem = dragItem.current;
      if (
        currentItem.grpI === params.grpI &&
        currentItem.itemI === params.itemI
      ) {
        console.log("Im moving now change my styles");
        return true;
      }
    };

    // Submit form handler
    const submitButtonHandler = (e, newData) => {
      e.preventDefault();
      console.log("submitting");
      console.log(data[0].items);
      console.log(newData);
      let count = 0;
      // data.map((item) => {
      data.forEach((item) => {
        console.log(item);
        count += item.items.length;
      });
      // Push to the state here
      data[0].items.push({
        title: newData.title.value,
        desc: newData.description.value,
        date: new Date(),
        taskNr: count,
      });

      // let count = 0;
      // for (let item in data) {
      //   count = item.length;
      // }
      console.log("@@@@@@COUNT ITEMS");
      console.log(count);
      // Update the firebase
      updateTask(data, projectId);

      // Delete Values from the form
      // TODO This is missing
      // setAddNewForm({
      //     ...addNewForm,
      //     title: {

      //     }
      // });

      // Close the form
      setOpenAddNewModal(false);
      setAddNewForm({
        ...addNewForm,
        title: {
          ...addNewForm.title,
          value: "",
        },
        description: {
          ...addNewForm.description,
          value: "",
        },
      });
    };

    // Archive the project handler
    const submitArchiveHandler = (e) => {
      console.log("I will delete this");
      archiveProject(projectId);
      setOpenArchiveModal(false);
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
              {/* <AddNew /> */}
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
    // console.log(props.match.params);

    return (
      <animated.div style={props} className={classes.Project}>
        {closedRedirect}
        {/* TITLE */}
        {/* <Title title="Project Title" /> */}
        <Title title={title} />
        {/* BOARDS */}
        <div className={classes.Project__boards}>
          {/* <Board title='Tasks' />
                <Board title='In Progress' />
                <Board title='Completed' /> */}
          {data.map((grp, grpI) => (
            <div key={grp.title} className={classes.Board}>
              <h2>{grp.title}</h2>
              {/* <h2>{projectId}</h2> */}
              <div
                // key={grp.title}
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
                    // date={moment(item.timestamp).fromNow()}
                    // date={item.timestamp}
                    // date={moment(item.date.toDate()).fromNow()}
                    isChecked={grp.title === "Completed" ? true : false}
                    // key={item}
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
                    hasDragClass={dragging ? getStyles({ grpI, itemI }) : null}
                    onDragOver={(e) => e.preventDefault()}
                  />
                ))}
                {/* <ToDo
                                isDraggable={true}
                                dragStart={(e) => handleDragStart(e, { title: grp.title, id: grpI })}
                                // Happens on the items that accept this events
                                dragEnter={dragging ? (e) => { handleDragEnter(e, { title: grp.title, id: grpI }) } : null}
                                idDragging={dragging}
                                // If is dragging, then change the class
                                hasDragClass={dragging ? getStyles({ title: grp.title, id: grpI }) : null}
                            />
                            <ToDo
                                isDraggable={true}
                                dragStart={(e) => handleDragStart(e, { title: grp.title, id: grpI })}
                                // Happens on the items that accept this events
                                dragEnter={dragging ? (e) => { handleDragEnter(e, { title: grp.title, id: grpI }) } : null}
                                idDragging={dragging}
                                // If is dragging, then change the class
                                hasDragClass={dragging ? getStyles({ title: grp.title, id: grpI }) : null}
                            /> */}
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

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    // userData: state.firestore.data,
    project: state.firestore.data.projectInfo,
    // projectDone: state.firestore.data.done,
    // projectProgress: state.firestore.data.progress,
    tasks: state.firestore.data.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (data, projectId) => dispatch(actions.addTask(data, projectId)),
    archiveProject: (projectId) => dispatch(actions.archiveProject(projectId)),
    // toggleCheckedTodo: (id, actualData) => dispatch(actions.toggleChecked(id, actualData)),
    // onEditSubmitHandler: (id, data) => dispatch(actions.editToDo(id, data)),
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
        // Order the todos by the timestamp filed on the server
        // orderBy: [
        //     'timestamp',
        //     'desc'
        // ]
      },
      // {
      //     collection: 'userData',
      //     doc: props.userId,
      //     subcollections: [
      //         {
      //             collection: 'projects',
      //             doc: props.match.params.projectId,
      //             subcollections: [
      //                 {
      //                     collection: 'done'
      //                 }
      //             ]
      //         },
      //     ],
      //     // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
      //     storeAs: 'done',
      //     // Order the todos by the timestamp filed on the server
      //     // orderBy: [
      //     //     'timestamp',
      //     //     'desc'
      //     // ]
      // },
      // {
      //     collection: 'userData',
      //     doc: props.userId,
      //     subcollections: [
      //         {
      //             collection: 'projects',
      //             doc: props.match.params.projectId,
      //             subcollections: [
      //                 {
      //                     collection: 'progress'
      //                 }
      //             ]
      //         },
      //     ],
      //     // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
      //     storeAs: 'progress',
      //     // Order the todos by the timestamp filed on the server
      //     // orderBy: [
      //     //     'timestamp',
      //     //     'desc'
      //     // ]
      // },
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
        // Order the todos by the timestamp filed on the server
        // orderBy: [
        //     'timestamp',
        //     'desc'
        // ]
      },
    ])
  )(Project)
);

// export default withRouter(Project);
