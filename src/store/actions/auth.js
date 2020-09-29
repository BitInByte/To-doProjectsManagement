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
    console.error(err);
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
      })
      .then(() => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.SIGNUP_ERROR, err });
      });
  } catch (err) {
    console.error(err);
  }
};

export const signOut = () => async (dispatch, getState, getFirebase) => {
  dispatch({ type: actionTypes.AUTH_START });

  try {
    await getFirebase()
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.error(err);
  }
};

export const resendEmail = () => (dispatch, getState, getFirebase) => {
  // Send a dispatch to fires the loading
  dispatch({ type: actionTypes.AUTH_START });
  // Get the current user
  const user = getFirebase().auth().currentUser;
  // Send an email to confirm the user
  user.sendEmailVerification().catch((err) => {
    throw new Error(err);
  });
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
  const userDbRef = getFirebase().firestore().collection("users").doc(user.uid);

  // validation to check which data should be stored and where

  if (data.firstName) {
    try {
      await userDbRef
        .update({
          firstName: data.firstName,
          initials: data.firstName[0] + data.lastName[0],
        })
        .then(() => {
          dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
        })
        .catch((err) => {
          dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
        });
    } catch (err) {
      console.error(err);
    }
  }

  if (data.lastName) {
    try {
      await userDbRef
        .update({
          lastName: data.lastName,
          initials: data.firstName[0] + data.lastName[0],
        })
        .then(() => {
          dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
        })
        .catch((err) => {
          dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
        });
    } catch (err) {
      console.error(err);
    }
  }

  //   To change the password or/and the email we need to re authenticate the user again
  //   https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618
  // Website explaining why
  if (data.email) {
    try {
      await user
        .updateEmail(data.email)
        .then(() => {
          dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
        })
        .catch((err) => {
          dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
        });
    } catch (err) {
      console.error(err);
    }
  }

  if (data.password) {
    try {
      await user
        .updatePassword(data.password)
        .then(() => {
          dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
        })
        .catch((err) => {
          dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
        });
    } catch (err) {
      console.error(err);
    }
  }

  if (data.image) {
    if (data.image.type.split("/")[0] === "image") {
      // Delete the old Image
      const storageRef = await getFirebase().storage().ref();
      const filesRef = await storageRef.child(`profileImage/${user.uid}`);

      try {
        await filesRef
          .listAll()
          .then((result) => {
            result.items.forEach((file) => {
              file.delete();
            });
            dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
          })
          .catch((err) => {
            dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
          });
      } catch (err) {
        console.error(err);
      }

      try {
        // Upload new image
        await getFirebase()
          .uploadFile(`profileImage/${user.uid}`, data.image)
          .then((url) => {
            const imageUrl = url.uploadTaskSnapshot.ref.getDownloadURL();
            imageUrl.then((url) => {
              return userDbRef
                .update({
                  profileImg: url,
                })
                .catch((err) => {
                  dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
                });
            });
          })
          .catch((err) => {
            dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
          });
      } catch (err) {
        console.error(err);
      }

      // send a dispatch to delete the loading
      dispatch({ type: actionTypes.CHANGEPROFILE_SUCCESS });
    } else {
      dispatch({
        type: actionTypes.CHANGEPROFILE_ERROR,
        err: {
          message:
            "You should upload a valid image file! Please, try files with the following extensions: .jpg, .jpeg, .png, .gif, .bmp",
        },
      });
    }
  }
};

export const deleteAccount = () => async (dispatch, getState, getFirebase) => {
  // Current user logged in
  const user = getFirebase().auth().currentUser;

  const userDbRef = getFirebase()
    .firestore()
    .collection("userData")
    .doc(user.uid);

  // Fires the loading stage
  dispatch({ type: actionTypes.AUTH_START });

  // Uncomment this
  await user
    .delete()
    .then(async () => {
      await userDbRef
        .collection("todos")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            element.ref.delete();
          });
        })
        .catch((err) => {
          console.error("todos");
          console.error(err);
        });

      await userDbRef
        .collection("projects")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            element.ref.delete();
          });
        })
        .catch((err) => {
          console.error("projects");
          console.error(err);
        });

      const storageRef = await getFirebase().storage().ref();
      const filesRef = await storageRef.child(`profileImage/${user.uid}`);

      await filesRef
        .listAll()
        .then((result) => {
          result.items.forEach((file) => {
            file.delete();
          });
        })
        .catch((err) => {
          console.error(err);
        });

      await getFirebase()
        .firestore()
        .collection("users")
        .doc(user.uid)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    })
    .then(() => {
      dispatch({ type: actionTypes.DELETEACCOUNT_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETEACCOUNT_ERROR, err });
    });
};

export const recoverPassword = (email) => async (
  dispatch,
  getState,
  getFirebase
) => {
  // Fires the loading stage
  dispatch({ type: actionTypes.AUTH_START });
  //  Send an email with the password reset
  try {
    await getFirebase()
      .resetPassword(email)
      .then(() => {
        dispatch({ type: actionTypes.RECOVERPASSWORD_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.RECOVERPASSWORD_ERROR, err });
      });
  } catch (err) {
    console.error(err);
  }
};

export const addNewImageReducer = (image) => {
  return { type: actionTypes.ADD_NEW_IMAGE, image };
};

export const cleanUp = () => {
  return { type: actionTypes.CLEANUP };
};
