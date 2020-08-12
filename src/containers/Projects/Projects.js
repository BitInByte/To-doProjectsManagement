//Import libraries
import React from 'react';

//Import components
import Title from '../../components/UI/Title/Title';
import Cards from '../../components/Cards/Cards';

//Import scoped class modules
import classes from './Projects.module.scss';

//Stateless component
const Projects = (props) => {
    return (
        <div className={classes.Projects}>
            {/* TITLE */}
            <Title title='Projects' />
            {/* PROJECTS */}
            <div className={classes.Projects__wrapper}>
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                {/* <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' />
                <Cards text='My project title here' /> */}
            </div>
            {/* NEW BUTTON */}
        </div>
    );
};

export default Projects;