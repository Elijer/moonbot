import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    let [img] = useState(
        "https://images.unsplash.com/photo-1535332371349-a5d229f49cb5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
        //"https://images.unsplash.com/photo-1483221186507-3cfe60ffb2ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
        //"https://images.unsplash.com/photo-1635759287179-76f77c3234a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        //"https://images.unsplash.com/photo-1566847124586-fad08845cb5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        //"https://images.unsplash.com/photo-1535332371349-a5d229f49cb5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
        //"https://images.unsplash.com/photo-1521489871110-81dc5a61dbda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1228&q=80"
        //"https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
        //"https://images.unsplash.com/photo-1475359201948-d44193401fae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        //"https://images.unsplash.com/photo-1465173121987-373740a169b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        //"https://images.unsplash.com/photo-1476794162124-6e700c3ddcff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1678&q=80"
        //"https://images.unsplash.com/photo-1635840106647-ba49d2c4e3db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
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
