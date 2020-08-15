import * as actionTypes from './actionTypes';

export const signIn = (credentials) => async (dispatch, getState, getFirebase) => {

    dispatch({ type: actionTypes.AUTH_START });

    try {
        await getFirebase().auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => {
            dispatch({ type: actionTypes.LOGIN_SUCCESS });
        }).catch(err => {
            dispatch({ type: actionTypes.LOGIN_ERROR, err });
        });
    } catch (err) {
        console.log(err);
    }
};

export const signUp = (newUser) => async (dispatch, getState, getFirebase) => {

    dispatch({ type: actionTypes.AUTH_START });

    try {
        await getFirebase().auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then(resp => {
            // We use collection instead of add because we want to add a specific id to the doc
            return getFirebase().firestore().collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
            })
        }).then(() => {
            // Get the current user
            const user = getFirebase().auth().currentUser;
            // Send an email to confirm the user
            user.sendEmailVerification();
            console.log(user);
        }).then(() => {
            dispatch({ type: actionTypes.SIGNUP_SUCCESS });
        }).catch(err => {
            dispatch({ type: actionTypes.SIGNUP_ERROR, err });
        });
    } catch (err) {
        console.log(err);
    }
};

export const signOut = () => async (dispatch, getState, getFirebase) => {

    dispatch({ type: actionTypes.AUTH_START });

    await getFirebase().auth().signOut().then(() => {
        // console.log('signout');
        dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
    });
};

export const resendEmail = () => (dispatch, getState, getFirebase) => {
    // Send a dispatch to fires the loading
    dispatch({ type: actionTypes.AUTH_START });
    // Get the current user
    const user = getFirebase().auth().currentUser;
    // Send an email to confirm the user
    user.sendEmailVerification();
    // Send a dispatch to finish the loading
    dispatch({ type: actionTypes.RESENDEMAIL_SUCCESS });
};