import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'
import EnergyInput from './Tracker/EnergyInput'

import dd from '../utilities/Debugger'

const Tracker = () => {

    let { time } = useContext(TimeContext)
    let { user, authTokens, serverURL } = useContext(AuthContext)
    let [entryData, setEntryData] = useState({})

    useEffect(() => {

        getEntry({
            dateString: time.dateString
        })

    }, [time.dateString])

    let getEntry = async(someData) => {

        let response = await fetch(serverURL + 'getEntry/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                'dateString': time.dateString,
            })
        })

        let data = await response.json()
        if (response.status === 200){
            setEntryData(data)
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
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput data= {entryData} user = {user} />
            < EnergyInput />
        </div>
    )
}

export default Tracker
