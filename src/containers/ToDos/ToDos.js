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

//Import scoped class modules
import classes from './ToDos.module.scss';

// Import actions
import * as actions from '../../store/actions';

//Stateless component
const ToDos = ({ addNewTodo, todos, toggleCheckedTodo }) => {

    console.log('firebase TODOS');
    // console.log(props);
    // console.log(props.auth.uid);

    // State to controll the modal
    const [openAddNewModal, setOpenAddNewModal] = useState(false);

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
        setOpenAddNewModal(false);
        console.log('ADD NEW SUBMIT');
        console.log(data);
        addNewTodo(data);
    };

    // Create the modal
    let modal = null;
    if (openAddNewModal) {
        modal = (
            <div className={classes.Modal} >
                <Modal click={() => setOpenAddNewModal(false)}>
                    <h2>Add a new Task</h2>
                    <AddNew submitHandler={submitButtonHandler} />
                </Modal>
            </div>
        );
    };

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


    return (
        <div className={classes.Todos}>
            {/* Title */}
            <Title title={'To-Dos'} />
            {/* To-Dos */}
            <div className={classes.Todos__container}>
                <TodoWrapper>
                    {todoArray.map(el => <ToDo
                        key={el.id}
                        title={el.title}
                        date={moment(el.date).fromNow()}
                        click={(event) => todoCheckHandler(event, { id: el.id, checked: el.isChecked })}
                        hasChecbox
                        isChecked={el.isChecked} />)}
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
                <Controllers btn1="Add New" btn1Click={() => setOpenAddNewModal(!openAddNewModal)} btn2="Show Done" />
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