import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import dd from '../utilities/Debugger'

const SettingsPage = () => {

    let { time } = useContext(TimeContext)
    let { user } = useContext(AuthContext)
    let [settings, setSettings] = useState({})

    useEffect(() => {

        getSettings({
            dateString: time.dateString
        })

    }, [time.dateString])

    let getSettings = async() => {
        dd(time)

        let response = await fetch(serverURL + 'getUserSettings/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
/*             body: JSON.stringify({
                'dateString': time.dateString,
                //'dayInMilliseconds': dayInMilliseconds()
            }) */
        })

        let data = await response.json()
        dd(data)
        if (response.status === 200){
            setSettings(data)
            dd(data)
        } else if (response.status === 401){
            alert("You are not authorized to read this user's settings")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The user you are trying to view could not be found.")
            //setBody(props.data.body)
        }
    }

    return (
        <div> Settings </div>
    )
}

export default SettingsPage
