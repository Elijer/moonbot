import React, { useContext, useEffect, useState } from 'react'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'
import FireContext from '../context/FireContext'
import AuthContext from '../context/AuthContext'
import dd from '../utilities/Debugger'

//import dd from '../utilities/Debugger'

const Tracker = () => {

    let { db, time } = useContext(FireContext)
    let { user } = useContext(AuthContext)
    let entryRef = db.collection("entries").doc(time.dateString);
    let [entryData, setEntryData] = useState({})

    useEffect(() => {

        entryRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                setEntryData(data)
            }
        })

    }, [])


    return (
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput data= {entryData} user = {user} />
        </div>
    )
}

export default Tracker
