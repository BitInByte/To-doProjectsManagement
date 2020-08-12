//Import libraries
import React from 'react';

//Import components
import Title from '../UI/Title/Title';
import Board from '../Board/Board';


//Import scoped class modules
import classes from './Project.module.scss';

//Stateless component
const project = (props) => (
    <div className={classes.Project}>
        {/* TITLE */}
        <Title title="Project Title" />
        {/* BOARDS */}
        <div className={classes.Project__boards}>
            <Board title='Tasks' />
            <Board title='In Progress' />
            <Board title='Completed' />
        </div>
        {/* CONTROLLERS */}
    </div>
);

export default project;