import React, { useContext } from 'react'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'
import FireContext from '../context/FireContext'

//import dd from '../utilities/Debugger'

const Tracker = () => {

    let { db, time } = useContext(FireContext)
    let entry = db.collection("entries").doc(time.dateString);

    return (
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput />
        </div>
    )
}

export default Tracker
