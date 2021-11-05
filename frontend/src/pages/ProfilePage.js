import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
// import dd from '../utilities/Debugger'

const ProfilePage = () => {

    let { user } = useContext(AuthContext)

    return (
        <div id = "profile-page" className = "push">
            <h1> Profile </h1>
            <p> Hey {user.username}, what's up? </p>
            < Posts list = "true" byUser = {user.id} />
        </div>
    )
}

export default ProfilePage