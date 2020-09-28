// Import libraries
import React, { Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";

// Import components
import Layout from "./hoc/layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/SpinnerContainer/SpinnerContainer";

// Import actions
import * as actions from "./store/actions";

const App = ({ auth, signOut, firebase, firestore, profile }) => {
  const Projects = React.lazy(() => import("./containers/Projects/Projects"));

  const ToDos = React.lazy(() => import("./containers/ToDos/ToDos"));

  const Settings = React.lazy(() => import("./containers/Settings/Settings"));

  const Archive = React.lazy(() => import("./containers/Archive/Archive"));

  const Project = React.lazy(() => import("./containers/Project/Project"));

  let routes = null;

  if (auth.apiKey && auth.emailVerified) {
    if (isLoaded(profile)) {
      routes = (
        <Layout initials={profile.initials} profileImage={profile.profileImg}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/todos" component={ToDos} />
              <Route path="/projects" component={Projects} />} />
              <Route path="/archive" component={Archive} />} />
              <Route path="/settings" component={Settings} />} />
              <Route path="/project/:projectId" component={Project} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={Dashboard} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      );
    } else {
      routes = <Spinner />;
    }
  } else if (auth.apiKey && !auth.emailVerified) {
    routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
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
    routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }

  return <div className="App">{routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actions.signOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
