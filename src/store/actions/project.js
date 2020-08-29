import * as actionTypes from './actionTypes';

export const addTask = (data, projectId) => async (dispatch, getState, getFirebase) => {

    // console.log('NEWPROJECTPROMISE');
    // console.log(data);

    const userId = getState().firebase.auth.uid;

    dispatch({ type: actionTypes.PROJECT_START });

    // await getFirebase().firestore().collection('userData').doc(userId).collection('projects').doc(projectId).collection('tasks').add({
    // await getFirebase().firestore().collection('userData').doc(userId).collection('projects').doc(projectId).collection('tasks').add({
    await getFirebase().firestore().collection('userData').doc(userId).collection('projects').doc(projectId).update({
        // ...data,
        // timestamp: new Date(),
        // data: [
        //     { title: 'Tasks', items: [{ title: 'changed', desc: 'askjhrwq' }, '2', '3'] },
        //     { title: 'Progress', items: ['4', '5', '6'] },
        //     { title: 'Completed', items: ['9', '8', '7'] },
        // ],
        data: data,
    }).then((doc) => {
        console.log('DOC');
        console.log(doc);
        // dispatch({ type: actionTypes.NEWPROJECT_SUCCESS });
    }).catch(err => {
        dispatch({ type: actionTypes.NEWPROJECT_ERROR });
    });
};

export const archiveProject = (projectId) => async (dispatch, getState, getFirebase) => {
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actionTypes.PROJECT_START });

    await getFirebase().firestore().collection('userData').doc(userId).collection('projects').doc(projectId).update({
        // ...data,
        // timestamp: new Date(),
        // data: [
        //     { title: 'Tasks', items: [{ title: 'changed', desc: 'askjhrwq' }, '2', '3'] },
        //     { title: 'Progress', items: ['4', '5', '6'] },
        //     { title: 'Completed', items: ['9', '8', '7'] },
        // ],
        data: {},
        isClosed: true,
        dateClosed: new Date(),
    }).then((doc) => {
        console.log('DOC');
        console.log(doc);
        // dispatch({ type: actionTypes.ARCHIVE_SUCCESS });
    }).catch(err => {
        // dispatch({ type: actionTypes.NEWPROJECT_ERROR });
    });
};