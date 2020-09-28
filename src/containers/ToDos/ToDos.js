//Import libraries
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import moment from "moment";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Title from "../../components/UI/Title/Title";
import TodoWrapper from "../../components/TodoWrapper/TodoWrapper";
import ToDo from "../../components/ToDo/ToDo";
import Controllers from "../../components/Controllers/Controllers";
import Modal from "../../components/UI/Modal/Modal";
import AddNew from "../AddNew/AddNew";
import Button from "../../components/UI/Button/Button";
import TaskViewer from "../../components/TaskViewer/TaskViewer";
import EditTask from "../EditTask/EditTask";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./ToDos.module.scss";

// Import actions
import * as actions from "../../store/actions";

//Stateless component
const ToDos = ({
  addNewTodo,
  todos,
  toggleCheckedTodo,
  onEditSubmitHandler,
}) => {
  // State to control the modal
  const [openModal, setOpenModal] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editTaskMode, setEditTaskMode] = useState(false);

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

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  if (!isLoaded(todos)) {
    return <Spinner />;
  } else {
    // Check on uncheck the todo
    const todoCheckHandler = (e, { id, checked }) => {
      e.preventDefault();
      toggleCheckedTodo(id, checked);

      e.nativeEvent.stopImmediatePropagation();

      e.stopPropagation();
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
    };

    // Submit the updated ToDo
    const submitEditTaskHandler = (e, id, data) => {
      // Prevent page to reload
      e.preventDefault();
      // Close the edit task modal
      closeEditModal();

      // Submit changes
      onEditSubmitHandler(id, data);
    };

    // Submit the new todo
    const submitButtonHandler = (e, data) => {
      e.preventDefault();
      setOpenModal(false);
      // Clearing inputs
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
      const sendData = {
        title: data.title.value,
        desc: data.description.value,
      };
      addNewTodo(sendData);
    };

    // Create the modal
    let modal = null;
    if (openModal) {
      modal = (
        <div className={classes.Modal}>
          <Modal click={() => setOpenModal(false)} modalOpen={openModal}>
            <div className={classes.Todos__modal}>
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
    }

    const closeEditModal = () => {
      setEditTask(null);
      setEditTaskMode(false);
    };

    const editTodoHandler = (e, data) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
      setEditTask({ ...data });
    };

    if (editTask) {
      modal = (
        <div className={classes.ToDos__modal}>
          <Modal click={closeEditModal} modalOpen={editTask}>
            <div className={classes.Todos__modal}>
              {editTaskMode ? <h2>Edit your task</h2> : null}
              {editTaskMode ? (
                <EditTask
                  data={editTask}
                  submitHandler={submitEditTaskHandler}
                />
              ) : (
                <TaskViewer
                  id={editTask.id}
                  title={editTask.title}
                  desc={editTask.desc}
                  date={editTask.date}
                />
              )}
              <div className={classes.ToDos__modal__button}>
                {editTaskMode ? null : (
                  <Button name="Edit" click={() => setEditTaskMode(true)} />
                )}
              </div>
            </div>
          </Modal>
        </div>
      );
    }

    // Convert the todos object into a new array to be mapped
    const todoArray = [];
    for (let el in todos) {
      todoArray.push({
        id: el,
        title: todos[el].title,
        desc: todos[el].desc,
        isChecked: todos[el].isChecked,
        date: todos[el].timestamp,
      });
    }

    // ToDos with no checked tasks
    const todoUnChecked = todoArray.filter((el) => {
      if (el.isChecked === false) return el;
      return null;
    });

    // ToDos with checked tasks
    const todoChecked = todoArray.filter((el) => {
      if (el.isChecked === true) return el;
      return null;
    });

    return (
      <animated.div style={props} className={classes.Todos}>
        {/* Title */}
        <Title title="To-Dos" />
        {/* To-Dos */}
        <div className={classes.Todos__container}>
          <TodoWrapper>
            {todoUnChecked.map((el) => (
              <ToDo
                key={el.id}
                title={el.title}
                desc={el.desc}
                date={moment(el.date.toDate()).fromNow()}
                click={(event) => {
                  todoCheckHandler(event, { id: el.id, checked: el.isChecked });
                }}
                hasCheckbox
                isChecked={el.isChecked}
                // hasCursor
                clicked={(e) =>
                  editTodoHandler(e, {
                    id: el.id,
                    title: el.title,
                    desc: el.desc,
                    date: moment(el.date.toDate()).fromNow(),
                  })
                }
              />
            ))}

            {showDoneTasks
              ? todoChecked.map((el) => (
                  <ToDo
                    key={el.id}
                    title={el.title}
                    desc={el.desc}
                    date={moment(el.date.toDate()).fromNow()}
                    click={(event) =>
                      todoCheckHandler(event, {
                        id: el.id,
                        checked: el.isChecked,
                      })
                    }
                    hasCheckbox
                    isChecked={el.isChecked}
                  />
                ))
              : null}
          </TodoWrapper>
          <div className={classes.Todos__controllers_container}>
            {modal}
            <div className={classes.Todos__controllers}>
              <Controllers
                btn1="Add New"
                btn1Click={() => setOpenModal(!openModal)}
                btn2={showDoneTasks ? "Hide Done" : "Show Done"}
                btn2Click={() => setShowDoneTasks(!showDoneTasks)}
              />
            </div>
          </div>
        </div>
        {/* Controllers */}
      </animated.div>
    );
  }
};

ToDos.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  todos: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  toggleCheckedTodo: PropTypes.func.isRequired,
  onEditSubmitHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    todos: state.firestore.data.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTodo: (data) => dispatch(actions.addTodo(data)),
    toggleCheckedTodo: (id, actualData) =>
      dispatch(actions.toggleChecked(id, actualData)),
    onEditSubmitHandler: (id, data) => dispatch(actions.editToDo(id, data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // Get all the todos from the firebase
  firestoreConnect((props) => [
    {
      collection: "userData",
      doc: props.userId,
      subcollections: [{ collection: "todos" }],
      // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
      storeAs: "todos",
      // Order the todos by the timestamp filed on the server
      orderBy: ["timestamp", "desc"],
    },
  ])
)(ToDos);
