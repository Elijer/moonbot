import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
//import dd from '../utilities/Debugger'


const LoginPage = () => {

    let { loginUser, loginAttempt } = useContext(AuthContext)
    let [img] = useState(
        "https://images.unsplash.com/photo-1537196369054-c87dc3fb7db0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
        )

    return (
        <div>
            <div id = "bg-color">
                <img id = "bg-image" src = {img} alt = ""/>
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

                <div className = "register-message login"> Don't have an account? <br></br> <Link to="/register" className = "register-link">Register here</Link>
                </div>
                
            </div>

        </div>
    )
}

export default LoginPage
