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

// Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCfcluagAp51tAuLFk_-2JqdpGFsZ5t4d4",
  authDomain: "m00nb0t.firebaseapp.com",
  projectId: "m00nb0t",
  storageBucket: "m00nb0t.appspot.com",
  messagingSenderId: "717345603721",
  appId: "1:717345603721:web:5a7c8e88fc43f9e97a8658",
  measurementId: "G-5TJ0NFDXVY"
})

const db = firebase.firestore()
console.log(db)

function App() {

  return (
    <div id = "app-all">
        <Router>

            <AuthProvider>
              <TimeProvider>

                <Header />

                  <Switch>
                    
                    <PrivateRoute component = {Tracker} path = "/" exact />
                    <Route component = {LoginPage} path = "/login" />
                    <Route component = {RegisterPage} path = "/register" />

                    <Route component={NotFound} />
                    
                  </Switch>

              </TimeProvider>
            </AuthProvider>
        </Router>    
    </div>
  );
}

export default App;
