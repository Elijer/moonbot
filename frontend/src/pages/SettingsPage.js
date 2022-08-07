import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import RequestContext from '../context/RequestContext'
import dd from '../utilities/Debugger'

const SettingsPage = () => {

    //let { time } = useContext(TimeContext)
    let { getSettings, setSettings, settings } = useContext(AuthContext)
    let { updateSettings } = useContext(RequestContext)
    //let [settings, setSettings] = useState({})

    let displayKey = {
        display_cries: "💧 Cry Tracker",
        display_energy: "⚡️ Energy Tracker",
        display_rest: "🛌 Rest Tracker",
        display_bc: "🌙 Birth Control",
        display_outside: "🦉 Outside Log"
    }

    // Log changes in settings to database
    useEffect(() => {

        dd(settings)

        updateSettings(settings)

    }, [settings])

    // Load initial settings
    useEffect(() => {

        getSettings()

    }, [])

    let handleSettingsChange = (key) => {
        setSettings({
            ...settings,
            [key]: !settings[key]
        })

/*         updateSettings({
            [updatedSettings[key][0]]: updatedSettings[key][1]
        }) */
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
                {Object.keys(settings).map((key, index) =>
                    <div
                    key = {`settings-item-${key}`}
                    className = "settings-item">

                        <span className = "settings-label" > {displayKey[key]}: </span>
                        <span className = "settings-value" >
                            <span
                            onClick = {() => handleSettingsChange(key)}
                            className = {"settings-value-inner "
                            + `settings-${settings[key] === true ? "on" : "off"}`}>

                                {settings[key] == true ? "On" : "Off"}

                            </span>
                        </span>

                    </div>)}
            </div>
        </div>
    )
}

export default SettingsPage
