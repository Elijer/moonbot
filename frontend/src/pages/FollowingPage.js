import React from 'react'
import { Posts } from '../components/Posts'
//import dd from '../utilities/Debugger'

const FollowingPage = () => {

    //let {authTokens, logoutUser, user, serverURL} = useContext(AuthContext)

    return (
        <div className = "push">
            <h1 className = "page-title"> Posts by Users you are Following </h1>
            <Posts list = "true" postsByFollowedAccounts = {true}/>
        </div>
    )
}

export default FollowingPage