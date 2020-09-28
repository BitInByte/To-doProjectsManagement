import * as actionTypes from "./actionTypes";

export const addTask = (data, projectId) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actionTypes.PROJECT_START });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(userId)
    .collection("projects")
    .doc(projectId)
    .update({
      data: data,
    })
    .then((doc) => {})
    .catch((err) => {
      dispatch({ type: actionTypes.NEWPROJECT_ERROR, err });
    });
};

export const archiveProject = (projectId) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actionTypes.PROJECT_START });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(userId)
    .collection("projects")
    .doc(projectId)
    .update({
      data: {},
      isClosed: true,
      dateClosed: new Date(),
    })
    .then((doc) => {})
    .catch((err) => {
      dispatch({ type: actionTypes.NEWPROJECT_ERROR, err });
    });
};
