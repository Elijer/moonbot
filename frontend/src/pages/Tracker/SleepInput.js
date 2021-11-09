import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import TimeContext from '../../context/TimeContext'
import dd from '../../utilities/Debugger'

import moment from 'moment';

const SleepInput = () => {

    let { time } = useContext(TimeContext)


    return (
        <div className = "section" id = "sleep-input">
            🛌 Bed
            <span className = "timeInputContainer">
            <input id = "nightInput" className = "timeInput" maxLength = "5"></input>
            </span>
            , woke
            <span className = "timeInputContainer">
            <input id = "morningInput" className = "timeInput"></input>
            </span>.
        </div>
    )
}

export default SleepInput