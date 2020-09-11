import * as actionTypes from "./actionTypes";
import { firestoreConnect } from "react-redux-firebase";

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

  if (data.image) {
    if (data.image.type.split("/")[0] === "image") {
      console.log("@@@@@@@STORAGE REFERENCES");

      // Delete the old Image
      const storageRef = await getFirebase().storage().ref();
      const filesRef = await storageRef.child(`profileImage/${user.uid}`);

      console.log(storageRef, filesRef);

      await filesRef.listAll().then((result) => {
        result.items.forEach((file) => {
          file.delete();
        });
      });

      console.log("I HAVE LAST NAME");
      console.log(data.lastName);

      // await getFirebase().storage().ref("Profile").put(data.image);

      // Upload new image
      const uploadedFile = await getFirebase()
        .uploadFile(
          `profileImage/${user.uid}`,
          data.image
          // ,`profileImage/${user.uid}`,
          // { name: `profileImg.${data.image.name.split(".").pop()}` }
        )
        .then((url) => {
          const imageUrl = url.uploadTaskSnapshot.ref.getDownloadURL();
          // console.log(url.uploadTaskSnapshot.ref.getDownloadURL());
          imageUrl.then((url) => {
            console.log("@@@@@@@@@@@Image Url");
            console.log(url);
            return getFirebase()
              .firestore()
              .collection("users")
              .doc(user.uid)
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

      console.log("@@@@@@@@@@@Image Url");
      // console.log(uploadedFile.uploadTaskSnapshot.ref.getDownloadURL());
      console.log(uploadedFile);
      // .child(`users/${user.uid}/${data.image.name}`)
      // .put(data.image);
      // await getFirebase()
      //   // .storage()
      //   .firestore()
      //   .collection("users")
      //   .doc(user.uid)
      //   // .ref("/profile.jpg")
      //   .update({
      //     imageName: data.image.name,
      //     image: data.image,
      //   })
      //   // .append(data.image)
      //   .then(() => {})
      //   .catch((err) => {
      //     dispatch({ type: actionTypes.CHANGEPROFILE_ERROR, err });
      //   });

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
  console.log("DELETING");

  // Current user logged in
  const user = getFirebase().auth().currentUser;

  // Fires the loading stage
  dispatch({ type: actionTypes.AUTH_START });

  // Uncomment this
  await getFirebase()
    .firestore()
    .collection("users")
    .doc(user.uid)
    .delete()
    .catch((err) => {
      console.log(err);
    });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(user.uid)
    .collection("todos")
    .get()
    .then((doc) => {
      console.log("@@@@What to delete");
      console.log(doc);
      doc.forEach((element) => {
        console.log(element);
        element.ref.delete();
      });
    })
    .catch((err) => {
      console.log(err);
    });

  await getFirebase()
    .firestore()
    .collection("userData")
    .doc(user.uid)
    .collection("projects")
    .get()
    .then((doc) => {
      console.log("@@@@What to delete");
      console.log(doc);
      doc.forEach((element) => {
        console.log(element);
        element.ref.delete();
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // await getFirebase()
  //   .storage()
  //   .ref(`profileImage/${user.uid}`)
  //   .listAll()
  //   .then((dir) => {
  //     dir.items.forEach((fileRef) => {
  //       this.deleteFile(ref.fullPath, fileRef.name);
  //     });
  //   });

  console.log("@@@@@@@STORAGE REFERENCES");
  const storageRef = await getFirebase().storage().ref();
  const filesRef = await storageRef.child(`profileImage/${user.uid}`);

  console.log(storageRef, filesRef);

  await filesRef.listAll().then((result) => {
    result.items.forEach((file) => {
      file.delete();
    });
  });

  // await getFirebase().deleteFile(`profileImage/${user.uid}`);

  // await getFirebase()
  //   .firestore()
  //   .collection("userData")
  //   .doc(user.uid)
  //   .collection("todos")
  //   .get()
  //   .then((doc) => {
  //     doc.ref.delete();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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

  // Uncomment this
  // await getFirebase()
  //   .firestore()
  //   .collection("userData")
  //   .doc(user.uid)
  //   .delete()
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // Uncomment this
  await user.delete().then().catch();

  // close loading
  dispatch({ type: actionTypes.DELETEACCOUNT_SUCCESS });
};

export const addNewImageReducer = (image) => {
  return { type: actionTypes.ADD_NEW_IMAGE, image };
};

// export const uploadImage = () => async (dispatch, getState, getFirebase) => {
//   console.log('Uploading image');
// }
