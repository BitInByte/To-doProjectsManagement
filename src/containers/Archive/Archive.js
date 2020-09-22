//Import libraries
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

//Import components
import Title from "../../components/UI/Title/Title";
import TodoWrapper from "../../components/TodoWrapper/TodoWrapper";
import ArchivedProjects from "../../components/ArchivedProjects/ArchivedProjects";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./Archive.module.scss";

//Stateless component
const Archive = ({ projects }) => {
  // If the data is not fetched yet from the server, then render a spinner
  if (!isLoaded(projects) || isEmpty(projects)) {
    return <Spinner />;
  } else {
    // Convert the projects object into an array
    const projectsArray = [];
    for (let el in projects) {
      projectsArray.push({
        id: el,
        title: projects[el].projectName,
        date: projects[el].timestamp,
      });
    }

    console.log(projects);
    return (
      <div className={classes.Archive}>
        <Title title="Archive" />
        <div className={classes.Archive__container}>
          <TodoWrapper>
            {projectsArray.map((el) => (
              <ArchivedProjects key={el.id} title={el.title} />
            ))}
            {/* <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects />
                        <ArchivedProjects /> */}
          </TodoWrapper>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    // userData: state.firestore.data,
    projects: state.firestore.data.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addNewProject: (data) => dispatch(actions.addProject(data)),
    // toggleCheckedTodo: (id, actualData) => dispatch(actions.toggleChecked(id, actualData)),
    // onEditSubmitHandler: (id, data) => dispatch(actions.editToDo(id, data)),
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
      // queryParams: ['isClosed=false'],
      where: [["isClosed", "==", true]],
      // where: [
      //     [
      //         'isClosed',
      //         '==',
      //         false,
      //     ]
      // ],
      // Will be stored by the name Todos on the state. Instead of using a path to get access to that, we use todos now on the mapStateToProps
      storeAs: "projects",
      // Order the todos by the timestamp filed on the server
      orderBy: ["timestamp", "desc"],
    },
  ])
)(Archive);
// export default Archive;
