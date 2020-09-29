//Import libraries
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import moment from "moment";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Title from "../../components/UI/Title/Title";
import Cards from "../../components/Cards/Cards";
import RoundButton from "../../components/UI/RoundButton/RoundButton";
import Modal from "../../components/UI/Modal/Modal";
import AddNew from "../AddNew/AddNew";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./Projects.module.scss";

// Import actions
import * as actions from "../../store/actions";

// Import utility
import { titleReduce } from "../../shared/utility";

//Stateless component
const Projects = ({ projects, addNewProject }) => {
  const [openModal, setOpenModal] = useState(false);

  // State to create the form dynamically
  const [addNewForm, setAddNewForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Insert your project title here...",
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
  });

  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  if (!isLoaded(projects)) {
    return <Spinner />;
  } else {
    const submitButtonHandler = (e, data) => {
      e.preventDefault();
      setOpenModal(false);
      setAddNewForm({
        ...addNewForm,
        title: {
          ...addNewForm.title,
          touched: false,
          value: "",
        },
      });
      addNewProject(data.title.value);
      data.title.value = "";
    };

    let modal = null;
    if (openModal) {
      modal = (
        <Modal click={() => setOpenModal(false)} modalOpen={openModal}>
          <div className={classes.Projects__modal}>
            <h2>Add a new project</h2>
            <AddNew
              submitHandler={submitButtonHandler}
              data={addNewForm}
              setData={setAddNewForm}
            />
          </div>
        </Modal>
      );
    }

    // Convert the projects object into an array
    const projectsArray = [];
    for (let el in projects) {
      projectsArray.push({
        id: el,
        title: projects[el].projectName,
        date: projects[el].timestamp,
      });
    }

    return (
      <animated.div style={props} className={classes.Projects}>
        {/* TITLE */}
        <Title title="Projects" />
        {/* PROJECTS */}
        <div className={classes.Projects__wrapper}>
          {isLoaded(projects)
            ? projectsArray.map((el) => (
                <Link key={el.id} to={`/project/${el.id}`}>
                  {" "}
                  <Cards
                    text={titleReduce(el.title)}
                    date={moment(el.date.toDate()).format("MMM Do YY")}
                  />{" "}
                </Link>
              ))
            : null}
        </div>
        {/* NEW BUTTON */}
        <RoundButton name="+" click={() => setOpenModal(!openModal)} />
        {modal}
      </animated.div>
    );
  }
};

Projects.propTypes = {
  projects: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  addNewProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    projects: state.firestore.data.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewProject: (data) => dispatch(actions.addProject(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // Get all the projects from the firebase
  firestoreConnect((props) => [
    {
      collection: "userData",
      doc: props.userId,
      subcollections: [{ collection: "projects" }],
      where: [["isClosed", "==", false]],
      // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
      storeAs: "projects",
      // Order the todos by the timestamp filed on the server
      orderBy: ["timestamp", "desc"],
    },
  ])
)(Projects);
