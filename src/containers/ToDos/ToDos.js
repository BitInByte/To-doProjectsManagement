//Import libraries
import React from 'react';

//Import components
import Title from '../../components/UI/Title/Title';
import TodoWrapper from '../../components/TodoWrapper/TodoWrapper';
import ToDo from '../../components/ToDo/ToDo';
import Controllers from '../../components/Controllers/Controllers';

//Import scoped class modules
import classes from './ToDos.module.scss';

//Stateless component
const ToDos = (props) => {

    const todoCheckHandler = (event) => {
        // On click on todo checkbox
        console.log(event.target.checked);
    };

    return (
        <div className={classes.Todos}>
            {/* Title */}
            <Title title={'To-Dos'} />
            {/* To-Dos */}
            <TodoWrapper>
                <ToDo click={todoCheckHandler} isChecked />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
                <ToDo click={todoCheckHandler} />
            </TodoWrapper>
            {/* Controllers */}
            <Controllers />
        </div>
    );
};

export default ToDos;