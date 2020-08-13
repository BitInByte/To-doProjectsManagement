//Import libraries
import React, { useState } from 'react';

//Import components
import Title from '../../components/UI/Title/Title';
import TodoWrapper from '../../components/TodoWrapper/TodoWrapper';
import ToDo from '../../components/ToDo/ToDo';
import Controllers from '../../components/Controllers/Controllers';
import Modal from '../../components/UI/Modal/Modal';
import AddNew from '../AddNew/AddNew';

//Import scoped class modules
import classes from './ToDos.module.scss';

//Stateless component
const ToDos = (props) => {

    const [openAddNewModal, setOpenAddNewModal] = useState(false);

    const todoCheckHandler = (event) => {
        // On click on todo checkbox
        console.log(event.target.checked);
    };

    const submitButtonHandler = (e) => {
        e.preventDefault();
        setOpenAddNewModal(false);
        console.log('submit');
    };

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


    return (
        <div className={classes.Todos}>
            {/* Title */}
            <Title title={'To-Dos'} />
            {/* To-Dos */}
            <div className={classes.Todos__container}>
                <TodoWrapper>
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox isChecked />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
                    <ToDo title="ToDo" click={todoCheckHandler} hasChecbox />
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

export default ToDos;