import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import backgroundImage from '../images/snowy_moon.jpeg';

const RegisterPage = () => {

    let { registerUser } = useContext(AuthContext)

    return (
        <div>
            <div id = "bg-color">
                <img id = "bg-image" src = {backgroundImage} alt = "" />
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
