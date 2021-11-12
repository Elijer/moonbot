import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utilities/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { TimeProvider } from './context/TimeContext'
import { RequestProvider } from './context/RequestContext'

import Tracker from './pages/Tracker'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Log from './pages/Log'
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
                <AuthProvider>
                  <RequestProvider>

                    <Header />

                      <Switch>
                        
                        <PrivateRoute component = {Tracker} path = "/" exact />
                        <PrivateRoute component = {Log} path = "/_log" exact/>

                        <Route component = {LoginPage} path = "/login" exact/>
                        <Route component = {RegisterPage} path = "/register" />

                        <Route component={NotFound} />
                        
                      </Switch>
                  </RequestProvider>
                </AuthProvider>
            </TimeProvider>
        </Router>    
    </div>
  );
}

export default App;
