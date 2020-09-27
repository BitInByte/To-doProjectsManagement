const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getDashboardCount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // functions.logger.info("Hello logs!", { structuredData: true });
    // const uid = request.get("/uid");
    // response.send("Hello from Firebase!");
    let responseObj = {
      todos: 0,
      todosDone: 0,
      projects: 0,
      projectsDone: 0,
    };

    console.log("Query", request.query.uid);
    const uid = request.query.uid;
    const userFirebaseRef = admin
      .firestore()
      .collection("userData")
      .doc(uid.toString());

    // admin
    //   .firestore()
    //   .collection("userData")
    //   .doc(uid.toString())
    userFirebaseRef
      .collection("todos")
      .get()
      .then((snapshot) => {
        let count = 0;
        let done = 0;
        snapshot.forEach((doc) => {
          // console.log("DOCx", doc.data());
          // response.send(doc.data());
          // count += 1;
          if (doc.data().isChecked === true) {
            done += 1;
          } else {
            count += 1;
          }
        });
        console.log("Count", count);
        responseObj.todos = count;
        console.log("todos", responseObj);
        console.log("done", done);
        responseObj.todosDone = done;

        // admin
        //   .firestore()
        //   .collection("userData")
        //   .doc(uid.toString())
        userFirebaseRef
          .collection("projects")
          .get()
          .then((snapshot) => {
            let projects = 0;
            let projectsDone = 0;
            snapshot.forEach((doc) => {
              // console.log("DOCx", doc.data());
              // response.send(doc.data());
              projects += 1;
              if (doc.data().isClosed === true) {
                projectsDone += 1;
              } else {
                // projects += 1;
              }
            });
            console.log("projects", projects);
            console.log("closed", projectsDone);
            responseObj.projects = projects;
            responseObj.projectsDone = projectsDone;
            // response.send(uid);
            console.log("Object", responseObj);
            response.send(responseObj);
          });
        // response.send(responseObj);

        // if (!snapshot.exists) {
        // } else {
        //   console.log("DOCyx", snapshot.data());
        //   response.send(snapshot.data());
        // }

        // console.log("DOC", doc.data());
        //   console.log()
        // console.log("DOCy", doc.data());
        // // response.send(doc.data());
        // if (doc.exists) {
        //   console.log("DOC2", doc.data());
        // }
      });
  });
});

// exports.todoCreated = functions.firestore
//   .document("userData/{uid}/todos")
//   .onCreate((doc) => {
//     // const user = doc.params.uid;
//     // console.log(doc);
//     console.log("Created");
//   });
