import React, { useContext} from 'react'
import TimeContext from '../../context/TimeContext'
import AuthContext from '../../context/AuthContext'
import { up } from '../../utilities/utilities'
//import dd from '../../utilities/Debugger'

const TimeDisplay = () => {

    let { time } = useContext(TimeContext)
    let { logoutUser } = useContext(AuthContext)

    return (
        <div id = "date">
            <div id = "day"> {time.date}, {up(time.timeOfDay)}</div>
            <div onClick = {logoutUser} id = "time"> Logout </div>
        </div>
    )
}

export default TimeDisplay
