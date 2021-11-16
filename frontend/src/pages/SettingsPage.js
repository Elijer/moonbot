import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import RequestContext from '../context/RequestContext'
import dd from '../utilities/Debugger'
import { s } from 'redom'

const SettingsPage = () => {

    let { time } = useContext(TimeContext)
    let { user, serverURL, authTokens } = useContext(AuthContext)
    let { updateSettings } = useContext(RequestContext)
    let [settings, setSettings] = useState([])

    let displayKey = {
        display_cries: "💧 Cry Tracker",
        display_energy: "⚡️ Energy Tracker",
        display_rest: "🛌 Rest Tracker",
        display_bc: "🌙 Birth Control",
        display_outside: "🦉 Outside Log"
    }

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

    let handleSettingsChange = (key) => {
        // settings is an array or arrays
        // key is just one item, an array of two values, the property, like 'display_bc', and the value,
        // either true or false
        // settings[settingsKey] will return me the correct object in settings


        // create a clone of the settings array
        //let updatedSettings = settings
        // find THIS item, the one that's been clicked, and change it's second value to the opposite of what it was
        //updatedSettings[key][1] = !settings[key][1]
        //dd(updatedSettings[key])

/*         setSettings(updateSettings)
        updateSettings({
            [updatedSettings[key][0]]: updatedSettings[key][1]
        }) */
    }

    return (
        <div className = "settings-container">
            <div className = "settings-header"> Select which data to track. </div>
            <div className = "settings-control-panel">
                {settings.map((i) =>
                    <div
                    key = {`settings-item-${i[0]}`}
                    className = "settings-item">

                        <span className = "settings-label" > {displayKey[i[0]]}: </span>
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
