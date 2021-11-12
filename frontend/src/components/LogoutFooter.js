import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContext'

const LogoutFooter = () => {

    let { logoutUser } = useContext(AuthContext)

    return (
        <div className = "logout-footer" >
            <div
            className = "logout-button"
            onClick = { logoutUser }> Logout </div>
        </div>
    )
}

export default LogoutFooter
