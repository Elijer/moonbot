import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utilities/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { TimeProvider } from './context/TimeContext'

import Tracker from './pages/Tracker'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFound from './pages/NotFound'
import Header from './components/Header'

import 'bootstrap/dist/css/bootstrap.min.css';
import { FireProvider } from './context/FireContext';

//import dd from './utilities/Debugger'

// Firebase
//import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

function App() {

  return (
    <div id = "app-all">
        <Router>
          <TimeProvider>
            <FireProvider>
                <AuthProvider>

                  <Header />

                    <Switch>
                      
                      <PrivateRoute component = {Tracker} path = "/" exact />
                      <Route component = {LoginPage} path = "/login" />
                      <Route component = {RegisterPage} path = "/register" />

                      <Route component={NotFound} />
                      
                    </Switch>
                </AuthProvider>
              </FireProvider>
            </TimeProvider>
        </Router>    
    </div>
  );
}

export default App;
