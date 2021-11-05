import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utilities/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ParamProfilePage from './pages/ParamProfilePage'
import FollowingPage from './pages/FollowingPage'
import NotFound from './pages/NotFound'
import Header from './components/Header'


import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div id = "app-all">
        <Router>

            <AuthProvider>

              <Header />

                <Switch>
                  
                  <PrivateRoute component = {HomePage} path = "/" exact />
                  <PrivateRoute component = {HomePage} path = "/page-:page" exact />

{/*                   <PrivateRoute component = {ProfilePage} path = "/yourprofile" /> */}
                  
                  <PrivateRoute component = {FollowingPage} path = "/following" />
                  <PrivateRoute component = {ParamProfilePage} path = "/profile/:handle" />

                  <Route component = {LoginPage} path = "/login" />
                  <Route component = {RegisterPage} path = "/register" />

                  <Route component={NotFound} />
                </Switch>


            </AuthProvider>
        </Router>    
    </div>
  );
}

export default App;
