import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import dd from '../utilities/Debugger'

const SettingsPage = () => {

    let { time } = useContext(TimeContext)
    let { user, serverURL, authTokens } = useContext(AuthContext)
    let [settings, setSettings] = useState([])

    useEffect(() => {

        getSettings()

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
        if (response.status === 200){
            let settingsArray = []

            // iterate data into an array and save to state
            for (const property in data) {
                settingsArray.push([
                    property,
                    data[property]
                ])
            }
            dd(settingsArray)
            setSettings(settingsArray)
        } else if (response.status === 401){
            alert("You are not authorized to read this user's settings")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The user you are trying to view could not be found.")
            //setBody(props.data.body)
        }
    }

    let handleSettingsChange = (settingsObj) => {
        dd(settingsObj)
        for (let setting in settings){
            if (settings[0] == settingsObj[0]){
                dd(setting)
            }
        }
    }

    return (
        <div className = "settings-container">
            <div className = "settings-header"> Select which data to track. </div>
            <div className = "settings-control-panel">
                {settings.map((i) =>
                    <div
                    key = {`settings-item-${i[0]}`}
                    className = "settings-item">

                        <span className = "settings-label" > {i[0]}: </span>
                        <span className = "settings-value" >
                            <span
                            onClick = {() => handleSettingsChange(i)}
                            className = {"settings-value-inner "
                            + `settings-${i[1] === true ? "on" : "off"}`}>

                                {i[1] == true ? "On" : "Off"}

                            </span>
                        </span>

                    </div>)}
            </div>
        </div>
    )
}

export default SettingsPage
