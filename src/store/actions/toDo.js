import * as actionTypes from "./actionTypes";

export const addTodo = (data) => async (dispatch, getState, getFirebase) => {
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actionTypes.TODO_START });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(userId)
    .collection("todos")
    .add({
      ...data,
      isChecked: false,
      timestamp: new Date(),
    })
    .then(() => {
      dispatch({ type: actionTypes.NEWTODO_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.NEWTODO_ERROR });
    });
};

export const toggleChecked = (id, actualState) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actionTypes.TODO_START });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(userId)
    .collection("todos")
    .doc(id)
    .update({
      isChecked: !actualState,
    })
    .then(() => {})
    .catch((err) => {});
};

export const editToDo = (id, data) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const userId = getState().firebase.auth.uid;

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(userId)
    .collection("todos")
    .doc(id)
    .update({
      ...data,
    })
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};
