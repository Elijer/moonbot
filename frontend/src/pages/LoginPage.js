import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import background from '../images/pink_sky.jpeg';
import dd from '../utilities/Debugger';
//import dd from '../utilities/Debugger'


const LoginPage = () => {

    let { loginUser, loginAttempt } = useContext(AuthContext)
    //console.log(process.env.NODE_ENV)
    
    return (
        <div>
            <div id = "bg-color">
                <img id = "bg-image" src = {background}
                alt = ""/>
            </div>
            <div className = "login">
                <div className = "login-panel">

                    {/* <h1 className = "form-header"> Log In </h1> */}

                    <form onSubmit = {loginUser} >
                        <input className = "form-line" type = "text" name = "username" placeholder = "username" autoComplete="off"/>
                        <input className = "form-line" type = "password" name = "password" placeholder = "password" autoComplete="off" />
                        <input className = "form-line form-submit" type = "submit" value = "login" />
                    </form>

                    { loginAttempt && 
                    <div className = "form-header"> Couldn't log you in. You probably supplied the wrong credentials. </div>
                    }

                </div>

                <div className = "register-message"> Don't have an account? <br></br> <Link to="/register" className = "register-link">Register here</Link>
                </div>
                
            </div>

        </div>
    )
}

export default LoginPage
