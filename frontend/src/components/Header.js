import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { up } from '../utilities/utilities'


const Header = () => {
    let { user, logoutUser, loginAttempt} = useContext(AuthContext)

    return (
            <div className = {"nav-bar " + (user ? "in" : "out")}>
                {/* <Link to="/" className = "nav-option">Home</Link> */}

                {user ? (
                    
                    <React.Fragment>

                            {/* <Link to={`/profile/${user.id}`} className = "nav-option" >{user.uppercaseUsername}</Link> */}
                            {/* <Link to="/following" className = "nav-option" >Following</Link> */}
                            <div className = "tracker-title-display"> ✨&nbsp;{up(user.username)}'s Mood Tracker </div>
                            <Link to="/" className = "nav-option">🌙&nbsp;Moonbot </Link>
                            <Link to="/_log" className = "nav-option">🔭&nbsp;Log </Link> 
                            <Link to="/" onClick = {logoutUser } className = "nav-option" >🌑&nbsp;Logout</Link>

                    </React.Fragment>

                ): 

                    <React.Fragment>

                            <Link to="/login" className = "nav-option" >🌙 Login</Link>
                            <Link to="/register" className = "nav-option" >✨ Register</Link>

                    </React.Fragment>
                    
                }

                    {/* <Link to="/" className = "header-title nav-option"> 🌙 MoonBot ✨ </Link> */}
                
                {loginAttempt &&
                <div id = "msg-danger" className="alert alert-danger" role="alert">
                    Login Failed
                </div>
                }
            </div>
    )
}

export default Header
