import React, { useEffect, useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import { useParams } from 'react-router-dom'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'

import dd from '../utilities/Debugger'

const Tracker = () => {

    let { user } = useContext(AuthContext)
    // let { time } = useContext(TimeContext)
    let { page } = useParams()

/*     useEffect(()=> {

    }, []) */


    return (
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput />
        </div>
    )
}

export default Tracker
