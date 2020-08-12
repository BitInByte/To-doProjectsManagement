// Import libraries
import React, { Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// Import components
import Layout from './hoc/layout/Layout';
// import Projects from './containers/Projects/Projects';
import Dashboard from './containers/Dashboard/Dashboard';

const App = () => {

  const Projects = React.lazy(() => import('./containers/Projects/Projects'));

  const ToDos = React.lazy(() => import('./containers/ToDos/ToDos'));

  const Settings = React.lazy(() => import('./containers/Settings/Settings'));

  const Archive = React.lazy(() => import('./containers/Archive/Archive'));

  const Project = React.lazy(() => import('./components/Project/Project'));

  let routes = (
    <Switch>
      <Route path='/todos' render={(...props) => <ToDos />} />
      <Route path='/projects' render={(...props) => <Projects />} />
      <Route path='/archive' render={(...props) => <Archive />} />
      <Route path='/settings' render={(...props) => <Settings />} />
      <Route path='/project' render={(...props) => <Project />} />
      <Route path='/' exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>

  );

  return (
    <div className="App">
      <Layout>
        {/* Required to work with React.lazy in Routes */}
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
