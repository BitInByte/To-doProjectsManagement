//Import libraries
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components
import Title from "../../components/UI/Title/Title";
import TodoWrapper from "../../components/TodoWrapper/TodoWrapper";
import ArchivedProjects from "../../components/ArchivedProjects/ArchivedProjects";
import Spinner from "../../components/UI/SpinnerContainer/SpinnerContainer";

//Import scoped class modules
import classes from "./Archive.module.scss";

//Stateless component
const Archive = ({ archive }) => {
  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  if (!isLoaded(archive)) {
    return <Spinner />;
  } else {
    // Convert the projects object into an array
    const projectsArray = [];
    for (let el in archive) {
      projectsArray.push({
        id: el,
        title: archive[el].projectName,
        date: archive[el].timestamp,
        closed: archive[el].dateClosed,
      });
    }

    // for (let project in archive) {
    //   console.log(new Date(archive[project].timestamp.toDate()));
    //   // console.log(projects[project].timestamp);
    // }

    return (
      <animated.div style={props} className={classes.Archive}>
        <Title title="Archive" />
        <div className={classes.Archive__container}>
          <TodoWrapper>
            {projectsArray.map((el) => (
              <ArchivedProjects
                key={el.id}
                title={el.title}
                dateCreated={el.date && new Date(el.date.toDate())}
                dateArchived={el.closed && new Date(el.closed.toDate())}
              />
            ))}
          </TodoWrapper>
        </div>
      </animated.div>
    );
  }
};

Archive.propTypes = {
  archive: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
    archive: state.firestore.data.archive,
  };
};

export default compose(
  connect(mapStateToProps, null),
  // Get all the projects from the firebase
  firestoreConnect((props) => [
    {
      collection: "userData",
      doc: props.userId,
      subcollections: [{ collection: "projects" }],
      where: [["isClosed", "==", true]],

      storeAs: "archive",
      // Order the todos by the timestamp filed on the server
      orderBy: ["timestamp", "desc"],
    },
  ])
)(Archive);
