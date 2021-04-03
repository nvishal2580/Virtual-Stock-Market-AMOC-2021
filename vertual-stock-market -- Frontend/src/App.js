import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard/Dashboard';
import { createBrowserHistory } from "history";


window.onunload = () => {
  //logout when browser is closed
  window.localStorage.clear();
}

export function isAuthenticated (){
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Dashboard />
  ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/dashboard" exact>
          {isAuthenticated}
        </Route>
         <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
