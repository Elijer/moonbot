import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
//import dd from '../utilities/Debugger'


const LoginPage = () => {

    let { loginUser, loginAttempt } = useContext(AuthContext)
    let [img] = useState(
        //"https://images.unsplash.com/photo-1483221186507-3cfe60ffb2ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
        //"https://images.unsplash.com/photo-1635759287179-76f77c3234a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        "https://images.unsplash.com/photo-1566847124586-fad08845cb5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        //"https://images.unsplash.com/photo-1521489871110-81dc5a61dbda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1228&q=80"
        //"https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
        //"https://images.unsplash.com/photo-1475359201948-d44193401fae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        //"https://images.unsplash.com/photo-1465173121987-373740a169b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        //"https://images.unsplash.com/photo-1476794162124-6e700c3ddcff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1678&q=80"
        //"https://images.unsplash.com/photo-1635840106647-ba49d2c4e3db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
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
