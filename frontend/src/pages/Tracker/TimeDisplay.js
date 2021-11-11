import React, { useContext} from 'react'
import TimeContext from '../../context/TimeContext'
import { up } from '../../utilities/Helpers'
//import dd from '../../utilities/Debugger'

const TimeDisplay = () => {

    let { time } = useContext(TimeContext)


    return (
        <div id = "date">
            <div id = "day"> {time.date}</div>
            <div id = "time"> {up(time.timeOfDay)} </div>
        </div>
    )
}

export default TimeDisplay
