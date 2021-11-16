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
    let [energySet, setEnergySet] = useState(false)
    let [BCSet, setBCSet] = useState(false)

    useEffect(() => {

        getEntry({
            dateString: time.dateString
        })

    }, [time.dateString])

    let getEntry = async(someData) => {
        dd(time)

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

            // If after morning and sleep has been set, the form isn't displayed
            if(typeof data.sleep_set == 'number'){
                if (time.timeOfDay && time.timeOfDay !== 'morning'){
                    setSleepSet(true)
                }
            }

            if(typeof data[`energy_${time.timeOfDay}`] == 'number'){
                setEnergySet(true)
            }

            if(typeof data.BC_day === 'number'){
                setBCSet(true)
            }

        } else if (response.status === 401){
            alert("You are not authorized to update this entry")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The entry you are trying to edit could not be found.")
            //setBody(props.data.body)
        }
    }

    let handleBirthControlChange = () => {
        setBCSet(false)
    }

    return (
        <div id = "tracker-page">
            < TimeDisplay />
            <div className = "tracker-body">

                {!sleepSet ?
                < SleepInput data= {entryData} user = {user} time = {time} /> :
                <h3 className = "section section-header"> 🛌 Nice! You already set your sleep data. </h3>
                }

                < CryInput data = {entryData}/>


                {!energySet ?
                < EnergyInput data = {entryData}/> :
                <h3 className = "section section-header"> {`⚡️ Good work, you've already set your ${time.timeOfDay} energy level.` }</h3>
                }

                {!BCSet ?
                < BCInput data = {entryData}/> :
                <h3 className = "section section-header"> {`🌙 Awesome. You logged taking birth control pill #${entryData.BC_day}. `}
                    <span className = "bc-change" onClick = {handleBirthControlChange}> Tap here to change it.</span>
                </h3>
                }
                {/* < LogoutFooter /> */}
            </div>
        </div>
    )
}

export default Tracker
