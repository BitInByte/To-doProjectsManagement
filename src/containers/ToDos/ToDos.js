//Import libraries
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

//Import components
import Title from '../../components/UI/Title/Title';
import TodoWrapper from '../../components/TodoWrapper/TodoWrapper';
import ToDo from '../../components/ToDo/ToDo';
import Controllers from '../../components/Controllers/Controllers';
import Modal from '../../components/UI/Modal/Modal';
import AddNew from '../AddNew/AddNew';
import Button from '../../components/UI/Button/Button';
import TaskViewer from '../../components/TaskViewer/TaskViewer';
import EditTask from '../EditTask/EditTask';

//Import scoped class modules
import classes from './ToDos.module.scss';

// Import actions
import * as actions from '../../store/actions';

//Stateless component
const ToDos = ({ addNewTodo, todos, toggleCheckedTodo, onEditSubmitHandler }) => {

    console.log('firebase TODOS');
    // console.log(props);
    // console.log(props.auth.uid);

    // State to controll the modal
    const [openModal, setOpenModal] = useState(false);
    const [showDoneTasks, setShowDoneTasks] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [editTaskMode, setEditTaskMode] = useState(false);

    console.log('TODOS');
    console.log(todos);

    // Check on uncheck the todo
    const todoCheckHandler = (event, { id, checked }) => {
        // On click on todo checkbox
        console.log(event.target.checked);
        toggleCheckedTodo(id, checked);
    };

    // Submit the new todo
    const submitButtonHandler = (e, data) => {
        e.preventDefault();
        setOpenModal(false);
        console.log('ADD NEW SUBMIT');
        console.log(data);
        addNewTodo(data);
    };

    // Submit the updated ToDo
    const submitEditTaskHandler = (e, id, data) => {
        // Prevent page to reload
        e.preventDefault();
        // Close the edit task modal
        closeEditModal();

        console.log('SUBMIT DATA');
        console.log(data);
        // Submit changes
        onEditSubmitHandler(id, data);
    };

    // Create the modal
    let modal = null;
    if (openModal) {
        modal = (
            <div className={classes.Modal} >
                <Modal click={() => setOpenModal(false)}>
                    <h2>Add a new Task</h2>
                    <AddNew submitHandler={submitButtonHandler} />
                </Modal>
            </div>
        );
    };

    const closeEditModal = () => {
        setEditTask(null);
        setEditTaskMode(false);
    };

    if (editTask) {
        console.log('@@@@@@@@@@@@@@@@@@MODAL OPEN');
        console.log(editTask);
        modal = (
            <div className={classes.ToDos__modal} >
                {/* <Modal click={() => setEditTask(null)}> */}
                <Modal click={closeEditModal}>
                    {/* <h2>Add a new Task</h2> */}
                    {editTaskMode ? <h2>Edit your task</h2> : null}
                    {editTaskMode ? <EditTask data={editTask} submitHandler={submitEditTaskHandler} /> : <TaskViewer id={editTask.id} title={editTask.title} desc={editTask.desc} date={editTask.date} />}
                    <div className={classes.ToDos__modal__button}>
                        {editTaskMode ? null : <Button name="Edit" click={() => setEditTaskMode(true)} />}
                    </div>
                </Modal>
            </div>
        );
    };

    console.log('Modal');
    console.log(modal);

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
    };
    console.log(todoArray);

    // ToDos with no checked tasks
    const todoUnChecked = todoArray.filter(el => {
        if (el.isChecked === false) return el;
    });

    // ToDos with checked tasks
    const todoChecked = todoArray.filter(el => {
        if (el.isChecked === true) return el;
    });


    return (
        <div className={classes.Todos}>
            {/* Title */}
            <Title title={'To-Dos'} />
            {/* To-Dos */}
            <div className={classes.Todos__container}>
                <TodoWrapper>
                    {/* {todoArray.map(el => <ToDo */}
                    {todoUnChecked.map(el => <ToDo
                        key={el.id}
                        title={el.title}
                        // date={moment(el.date).fromNow()}
                        date={moment(el.date.toDate()).fromNow()}
                        click={(event) => todoCheckHandler(event, { id: el.id, checked: el.isChecked })}
                        hasChecbox
                        isChecked={el.isChecked}
                        clicked={() => setEditTask({ id: el.id, title: el.title, desc: el.desc, date: moment(el.date.toDate()).fromNow(), })}
                    />)}

                    {showDoneTasks ? todoChecked.map(el => <ToDo
                        key={el.id}
                        title={el.title}
                        date={moment(el.date.toDate()).fromNow()}
                        click={(event) => todoCheckHandler(event, { id: el.id, checked: el.isChecked })}
                        hasChecbox
                        isChecked={el.isChecked}
                    />) : null}
                    {/* <ToDo title="ToDo" click={todoCheckHandler} hasChecbox isChecked />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox /> */}
                </TodoWrapper>
            </div>
            {/* Controllers */}
            <div className={classes.Todos__controllers}>
                <Controllers btn1="Add New" btn1Click={() => setOpenModal(!openModal)} btn2={showDoneTasks ? "Hide Done" : "Show Done"} btn2Click={() => setShowDoneTasks(!showDoneTasks)} />
                {modal}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    console.log('state');
    console.log(state);
    return {
        userId: state.firebase.auth.uid,
        // userData: state.firestore.data,
        todos: state.firestore.data.todos,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addNewTodo: (data) => dispatch(actions.addTodo(data)),
        toggleCheckedTodo: (id, actualData) => dispatch(actions.toggleChecked(id, actualData)),
        onEditSubmitHandler: (id, data) => dispatch(actions.editToDo(id, data)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // firestoreConnect(props => [
    //     `userData/${props.userId}/todos`,

    // ]),
    // Get all the todos from the firebase
    firestoreConnect((props) => [
        {
            collection: 'userData',
            doc: props.userId,
            // storeAs: 'todos',
            subcollections: [
                { collection: 'todos' },
            ],
            // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
            storeAs: 'todos',
            // Order the todos by the timestamp filed on the server
            orderBy: [
                'timestamp',
                'desc'
            ]
        }
    ])
    // connect(({ firestore: { data } }, props) => ({
    //     auth: props.firebase.auth,
    //     todos: data.todos && data.todos[id],
    // }))
)(ToDos)


// const enhance = compose(
//     connect(mapStateToProps),
//     firestoreConnect(props => [
//         // { path: `userData/${props.auth.uid}` }
//         // { collection: 'userData/' }
//     ])
// );

// export default enhance(ToDos);
// export default connect(mapStateToProps)(ToDos);