import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'

//import LogoutFooter from '../components/LogoutFooter'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'
import CryInput from './Tracker/CryInput'
import EnergyInput from './Tracker/EnergyInput'
import BCInput from './Tracker/BCInput'

import dd from '../utilities/Debugger'
import { dayInMilliseconds } from '../utilities/utilities'

const Tracker = () => {

    let { time } = useContext(TimeContext)
    let { user, authTokens, serverURL } = useContext(AuthContext)
    let [entryData, setEntryData] = useState({})
    let [sleepSet, setSleepSet] = useState(false)

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
                //'dayInMilliseconds': dayInMilliseconds()
            })
        })

        let data = await response.json()
        dd(data)
        if (response.status === 200){
            setEntryData(data)
/*             if (typof data.sleep_set){

            } */
        } else if (response.status === 401){
            alert("You are not authorized to update this entry")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The entry you are trying to edit could not be found.")
            //setBody(props.data.body)
        }
    }

    return (
        <div id = "tracker-page">
            < TimeDisplay />
            <div className = "tracker-body">
                < SleepInput data= {entryData} user = {user} time = {time} />
                < CryInput data = {entryData}/>
                < EnergyInput data = {entryData}/>
                < BCInput data = {entryData}/>
                {/* < LogoutFooter /> */}
            </div>
        </div>
    )
}

export default Tracker
