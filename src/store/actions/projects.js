import * as actionTypes from "./actionTypes";

export const addProject = (data) => async (dispatch, getState, getFirebase) => {
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actionTypes.PROJECT_START });

  try {
    await getFirebase()
      .firestore()
      .collection("userData")
      .doc(userId)
      .collection("projects")
      .add({
        projectName: data,
        timestamp: new Date(),
        data: [
          { title: "Tasks", items: [] },
          { title: "Progress", items: [] },
          { title: "Completed", items: [] },
        ],
        isClosed: false,
      })
      .then((doc) => {})
      .catch((err) => {
        dispatch({ type: actionTypes.NEWPROJECT_ERROR, err });
      });
  } catch (err) {
    console.error(err);
  }
};
