import * as actionTypes from "./actionTypes";

export const signIn = (credentials) => async (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch({ type: actionTypes.AUTH_START });

  try {
    await getFirebase()
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOGIN_ERROR, err });
      });
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (newUser) => async (dispatch, getState, getFirebase) => {
  dispatch({ type: actionTypes.AUTH_START });

  try {
    await getFirebase()
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        // We use collection instead of add because we want to add a specific id to the doc
        return getFirebase()
          .firestore()
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
          });
      })
      .then(() => {
        // Get the current user
        const user = getFirebase().auth().currentUser;
        // Send an email to confirm the user
        user.sendEmailVerification();
        console.log(user);
      })
      .then(() => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.SIGNUP_ERROR, err });
      });
  } catch (err) {
    console.log(err);
  }
};

export const signOut = () => async (dispatch, getState, getFirebase) => {
  dispatch({ type: actionTypes.AUTH_START });

  await getFirebase()
    .auth()
    .signOut()
    .then(() => {
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

export const changeProfile = (data) => async (
  dispatch,
  getState,
  getFirebase
) => {
  // send a dispatch to fires the loading
  dispatch({ type: actionTypes.AUTH_START });

  // Get the current user
  const user = getFirebase().auth().currentUser;

  // validation to check which data should be stored and where

  if (data.firstName) {
    console.log("I HAVE FIRST NAME");
    console.log(data.firstName);
    await getFirebase()
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        firstName: data.firstName,
        initials: data.firstName[0] + data.lastName[0],
      })
      .then(() => {})
      .catch((err) => {
        dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
      });
  }

  if (data.lastName) {
    console.log("I HAVE LAST NAME");
    console.log(data.lastName);
    await getFirebase()
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        lastName: data.lastName,
        initials: data.firstName[0] + data.lastName[0],
      })
      .then(() => {})
      .catch((err) => {
        dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
      });
  }

  //   To change the password or/and the email we need to re authenticate the user again
  //   https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618
  // Website explaining why
  if (data.email) {
    console.log("I HAVE EMAIL");
    console.log(data.email);
    await user
      .updateEmail(data.email)
      .then(() => {})
      .catch((err) => {
        dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
      });
  }

  if (data.password) {
    console.log("I HAVE PASSWORD");
    console.log(data.password);
    await user
      .updatePassword(data.password)
      .then(() => {})
      .catch((err) => {
        dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
      });
  }

  // send a dispatch to delete the loading
  dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
};

export const deleteAccount = () => async (dispatch, getState, getFirebase) => {
  console.log("DELETING");

  // Current user logged in
  const user = getFirebase().auth().currentUser;

  // Fires the loading stage
  dispatch({ type: actionTypes.AUTH_START });

  await getFirebase()
    .firestore()
    .collection("users")
    .doc(user.uid)
    .delete()
    .catch((err) => {
      console.log(err);
    });

  // await getFirebase()
  //   .firestore()
  //   .collection("userData")
  //   .doc(user.uid)
  //   .collection("projects")
  //   .delete()
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // await getFirebase()
  //   .firestore()
  //   .collection("userData")
  //   .doc(user.uid)
  //   .collection("todos")
  //   .delete()
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(user.uid)
    .delete()
    .catch((err) => {
      console.log(err);
    });

  await user.delete().then().catch();

  // close loading
  dispatch({ type: actionTypes.DELETEACCOUNT_SUCCESS });
};
