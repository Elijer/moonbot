import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    let [img] = useState(
        "https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
        //"https://images.unsplash.com/photo-1548391350-968f58dedaed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        )

    let { registerUser } = useContext(AuthContext)

    return (
        <div>
            <div id = "bg-color">
                <img id = "bg-image" src = {img} />
            </div>
            <div className = "login register">
                <div className = "login-panel">
                    <form onSubmit = {registerUser} >
                        <input type = "text" name = "username" placeholder = "Username" className = "form-line" autoComplete="off"/>
                        <input type = "text" name = "email" placeholder = "Email" className = "form-line" autoComplete="off"/>
                        <input type = "password" name = "password" placeholder = "Password" className = "form-line" autoComplete="off"/>
                        <input type = "password" name = "confirmation" placeholder = "Confirm Password" className = "form-line" autoComplete="off"/>
                        <input type = "submit" value = "Register" className = "form-line form-submit" />
                    </form>
                </div>

                <div className = "register-message login"> Have an account? <br></br> <Link to="/login" className = "register-link">Login here</Link>
                </div>

            </div>
        </div>
    )
}


export default RegisterPage
