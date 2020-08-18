//Import libraries
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

//Import components
import Title from '../../components/UI/Title/Title';
import Cards from '../../components/Cards/Cards';
import RoundButton from '../../components/UI/RoundButton/RoundButton';
import Modal from '../../components/UI/Modal/Modal';
import AddNew from '../AddNew/AddNew';

//Import scoped class modules
import classes from './Projects.module.scss';

//Stateless component
const Projects = ({ projects }) => {

    console.log('PROJECTS');
    console.log(projects);

    const [openModal, setOpenModal] = useState(false);

    // State to create the forn dynamically
    const [addNewForm, setAddNewForm] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Insert your project title here...',
            },
            label: 'Title',
            value: '',
            validation: {
                required: true,
            },
            isValid: false,
            touched: false,
            errorMessage: 'You should enter a valid Title!',
        },
    });

    const submitButtonHandler = (e, data) => {
        e.preventDefault();
        setOpenModal(false);
        console.log('Submitting...');
        console.log(data);
    };

    let modal = null;
    if (openModal) {
        modal = (
            <Modal click={() => setOpenModal(false)} >
                <h2>Add a new project</h2>
                <AddNew submitHandler={submitButtonHandler} data={addNewForm} setData={setAddNewForm} />
            </Modal>
        );
    };

    // Convert the projects object into an array
    const projectsArray = [];
    for (let el in projects) {
        projectsArray.push({
            id: el,
            title: projects[el].projectName,
            date: projects[el].timestamp,
        });
    };

    return (
        <div className={classes.Projects}>
            {/* TITLE */}
            <Title title='Projects' />
            {/* PROJECTS */}
            <div className={classes.Projects__wrapper}>
                {projectsArray.map(el => <Link key={el.id} to={`/project/${el.id}`}> <Cards text={el.title} date={moment(el.date.toDate()).format("MMM Do YY")} /> </Link>)}
                {/* {projectsArray.map(el => <Cards text={el.title} date={moment(el.date.toDate()).format("MMM Do YY")} />)} */}
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
                <Cards text='My project title here' /> */}
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
            <RoundButton name="+" click={() => setOpenModal(!openModal)} />
            {modal}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.firebase.auth.uid,
        // userData: state.firestore.data,
        projects: state.firestore.data.projects,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // addNewTodo: (data) => dispatch(actions.addTodo(data)),
        // toggleCheckedTodo: (id, actualData) => dispatch(actions.toggleChecked(id, actualData)),
        // onEditSubmitHandler: (id, data) => dispatch(actions.editToDo(id, data)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // Get all the projects from the firebase
    firestoreConnect((props) => [
        {
            collection: 'userData',
            doc: props.userId,
            subcollections: [
                { collection: 'projects' },
            ],
            // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
            storeAs: 'projects',
            // Order the todos by the timestamp filed on the server
            orderBy: [
                'timestamp',
                'desc'
            ]
        }
    ])
)(Projects)
// export default Projects;