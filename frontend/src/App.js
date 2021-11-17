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
import SettingsPage from './pages/SettingsPage'
import NotFound from './pages/NotFound'
import Header from './components/Header'

//import dd from './utilities/Debugger'

import 'firebase/compat/firestore'

function App() {

  return (
    <div id = "app-all">
        <Router>
          <AuthProvider>
                <TimeProvider>
                  <RequestProvider>

                    <Header />

                      <Switch>
                        
                        <PrivateRoute component = {Tracker} path = "/" exact />
                        <PrivateRoute component = {Log} path = "/_log" exact/>
                        <PrivateRoute component = {SettingsPage} path = "/settings" exact/>

                        <Route component = {LoginPage} path = "/login" exact/>
                        <Route component = {RegisterPage} path = "/register" />

                        <Route component={NotFound} />
                        
                      </Switch>
                  </RequestProvider>
                </TimeProvider>
            </AuthProvider>
        </Router>    
    </div>
  );
}

export default App;
