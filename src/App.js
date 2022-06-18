import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';



const SignupPage = lazy(() => import('./pages/Signup'))
const ListUsers = lazy(() => import('./pages/ListUsers'))
const LoginPage = lazy(() => import('./pages/Login'))

const App = () => {


  return (
    <div className='App'>
      <Router>
        <Suspense fallback={<div className="loader centerLoader" />}>
          <Switch>
            <Route exact path="/" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />

            <Route exact path="/users" component={ListUsers} />

            {/* <Route  exact path="/" component={SignupPage} /> */}
            {/* <Route  exact path="/" component={Dashboard} /> */}
          </Switch>
        </Suspense>
      </Router>
    </div>

  );
}

export default App;
