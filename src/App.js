// Import libraries
import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";

// Import components
import Layout from "./hoc/layout/Layout";
// import Projects from './containers/Projects/Projects';
import Dashboard from "./containers/Dashboard/Dashboard";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

// Import actions
import * as actions from "./store/actions";

const App = ({ auth, signOut, firebase, firestore, profile }) => {
  // useEffect(() => {
  //   signOut();

  // }, []);

  console.log(auth);
  console.log(auth.emailVerified);
  console.log("Loaded");
  console.log(isLoaded(auth));
  console.log("Firebase");
  console.log(firebase);
  console.log(firestore);

  const Projects = React.lazy(() => import("./containers/Projects/Projects"));

  const ToDos = React.lazy(() => import("./containers/ToDos/ToDos"));

  const Settings = React.lazy(() => import("./containers/Settings/Settings"));

  const Archive = React.lazy(() => import("./containers/Archive/Archive"));

  const Project = React.lazy(() => import("./containers/Project/Project"));

  let routes = null;

  // if (!isLoaded(auth)) {
  //   console.log('stage 1');
  //   routes = <p>Loading...</p>;
  // } else if (isLoaded(auth) && auth.apiKey && auth.emailVerified) {
  //   console.log('stage 2');
  //   routes = (
  //     <Layout>
  //       <Suspense fallback={<p>Loading...</p>}>
  //         <Switch>
  //           <Route path='/todos' render={(...props) => <ToDos />} />
  //           <Route path='/projects' render={(...props) => <Projects />} />
  //           <Route path='/archive' render={(...props) => <Archive />} />
  //           <Route path='/settings' render={(...props) => <Settings />} />
  //           <Route path='/project' render={(...props) => <Project />} />
  //           {/* <Route path='/auth' component={Auth} /> */}
  //           <Route path='/logout' component={Logout} />
  //           <Route path='/' exact component={Dashboard} />
  //           <Redirect to='/' />
  //         </Switch>
  //       </Suspense>
  //     </Layout>
  //   );
  // } else if (isLoaded(auth) && auth.apiKey && !auth.emailVerified) {
  //   console.log('stage 3');
  //   routes = (

  //     <Suspense fallback={<p>Loading...</p>} >
  //       <Switch>
  //         {/* <Route path='/' exact component={Auth} /> */}
  //         <Route path='/' exact render={(...props) => <Auth emailVerified={auth.emailVerified} token={auth.stsTokenManager.accessToken} />} />
  //         <Redirect to='/' />
  //       </Switch>
  //     </Suspense >
  //   );
  // } else {
  //   console.log('stage 4');
  //   routes = (

  //     <Suspense fallback={<p>Loading...</p>} >
  //       <Switch>
  //         <Route path='/' exact component={Auth} />
  //         {/* <Auth emailVerified={auth.emailVerified} token={auth.stsTokenManager.accessToken} /> */}
  //         <Redirect to='/' />
  //       </Switch>
  //     </Suspense >
  //   );
  // }
  if (auth.apiKey && auth.emailVerified) {
    console.log("stage 2");
    routes = (
      <Layout initials={profile.initials}>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/todos" render={(...props) => <ToDos />} />
            <Route path="/projects" render={(...props) => <Projects />} />
            <Route path="/archive" render={(...props) => <Archive />} />
            <Route path="/settings" render={(...props) => <Settings />} />
            <Route
              path="/project/:projectId"
              render={(...props) => <Project />}
            />
            {/* <Route path='/auth' component={Auth} /> */}
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Dashboard} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    );
  } else if (auth.apiKey && !auth.emailVerified) {
    console.log("stage 3");
    routes = (
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {/* <Route path='/' exact component={Auth} /> */}
          <Route
            path="/"
            exact
            render={(...props) => (
              <Auth
                emailVerified={auth.emailVerified}
                token={auth.stsTokenManager.accessToken}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  } else {
    console.log("stage 4");
    routes = (
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact component={Auth} />
          {/* <Auth emailVerified={auth.emailVerified} token={auth.stsTokenManager.accessToken} /> */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }

  // let routes = (
  //   <Switch>
  //     <Route path='/todos' render={(...props) => <ToDos />} />
  //     <Route path='/projects' render={(...props) => <Projects />} />
  //     <Route path='/archive' render={(...props) => <Archive />} />
  //     <Route path='/settings' render={(...props) => <Settings />} />
  //     <Route path='/project' render={(...props) => <Project />} />
  //     <Route path='/auth' component={Auth} />
  //     <Route path='/' exact component={Dashboard} />
  //     <Redirect to='/' />
  //   </Switch>
  // );

  return (
    <div className="App">
      {/* <Layout> */}
      {/* Required to work with React.lazy in Routes */}
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      {routes}
      {/* <p>Hello</p> */}
      {/* </Suspense> */}
      {/* </Layout> */}
      {/* <Auth emailVerified={auth.emailVerified} token={auth.stsTokenManager.accessToken} /> */}
      {/* <Auth emailVerified={auth.emailVerified} /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    // firebase: state.firebase,
    // firestore: state.firestore
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actions.signOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
