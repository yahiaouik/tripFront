import React from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import AdminPage from './pages/adminPage';
import ConnexionPage from './pages/connexionPage';
import UserPage from './pages/userPage';
import history from './history';
import SnackbarError from './components/error/snackbar';

function App() {
  return (
    <Router history={history}>
        <div>
          <Switch>
              <Route exact path='/' component={ConnexionPage} />
              <Route path='/Admin' component={AdminPage} />
              <Route path='/User' component={UserPage} />
          </Switch>
        </div>
        <SnackbarError/>
      </Router>
  );
}

export default App;
