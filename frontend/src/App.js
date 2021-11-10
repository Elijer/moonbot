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

function App() {

  return (
    <div id = "app-all">
        <Router>

            <AuthProvider>
              <TimeProvider>
                <FireProvider>

                  <Header />

                    <Switch>
                      
                      <PrivateRoute component = {Tracker} path = "/" exact />
                      <Route component = {LoginPage} path = "/login" />
                      <Route component = {RegisterPage} path = "/register" />

                      <Route component={NotFound} />
                      
                    </Switch>
                </FireProvider>
              </TimeProvider>
            </AuthProvider>
        </Router>    
    </div>
  );
}

export default App;
