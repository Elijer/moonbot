import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import TimeContext from '../../context/TimeContext'
import dd from '../../utilities/Debugger'

import moment from 'moment';

const TimeDisplay = () => {

    let { time } = useContext(TimeContext)


    return (
        <div id = "date">
            <div id = "day"> {time.date}</div>
            <div id = "time"> {time.time} </div>
        </div>
    )
}

export default TimeDisplay
