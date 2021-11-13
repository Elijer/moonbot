import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import dd from '../utilities/Debugger'

const Log = () => {

    let { user, authTokens, serverURL } = useContext(AuthContext)

    useEffect(() => {

        getData()

    }, [])

    let getData = async() => {

        let response = await fetch(serverURL + 'getAllEntries/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        let data = await response.json()
        if (response.status === 200){
            dd(data)
        } else if (response.status === 401){
            alert("You are not authorized to update this entry")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The entry you are trying to edit could not be found.")
            //setBody(props.data.body)
        }
    }

    return (
        <div>
            Log
        </div>
    )
}

export default Log
