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
            {/*<img id = "bg-image" src="https://images.unsplash.com/photo-1566847124586-fad08845cb5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" width="2000"></img>*/}
            {/*<img id = "bg-image" src="https://images.unsplash.com/photo-1635759287179-76f77c3234a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" />*/}
            <div id = "bg-color">
                <img id = "bg-image" src = {img} />
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
