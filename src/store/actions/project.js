import * as actionTypes from './actionTypes';

export const addTask = (data, projectId) => async (dispatch, getState, getFirebase) => {

    // console.log('NEWPROJECTPROMISE');
    // console.log(data);

    const userId = getState().firebase.auth.uid;

    dispatch({ type: actionTypes.PROJECT_START });

    await getFirebase().firestore().collection('userData').doc(userId).collection('projects').doc(projectId).collection('tasks').add({
        ...data,
        timestamp: new Date(),
    }).then((doc) => {
        console.log('DOC');
        console.log(doc);
        // dispatch({ type: actionTypes.NEWPROJECT_SUCCESS });
    }).catch(err => {
        dispatch({ type: actionTypes.NEWPROJECT_ERROR });
    });
};