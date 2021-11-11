import React from 'react'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'

//import dd from '../utilities/Debugger'

const Tracker = () => {

    return (
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput />
        </div>
    )
}

export default Tracker
