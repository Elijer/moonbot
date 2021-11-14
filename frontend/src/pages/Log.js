import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Rechart_1 from '../charts/Rechart_1'
import dd from '../utilities/Debugger'

const Log = () => {

    let { user, authTokens, serverURL } = useContext(AuthContext)
    let [data, setData] = useState({})

    useEffect(() => {

        getData()

    }, [])

    let getData = async() => {

        let response = await fetch(serverURL + 'graphAllEntries/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        let data = await response.json()
        if (response.status === 200){
            dd(data)
            setData(data)
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

            < Rechart_1 data = {data}> </ Rechart_1 >

        </div>
    )
}

export default Log
