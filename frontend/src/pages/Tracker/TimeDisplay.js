import React from 'react'
import moment from 'moment';
import dd from '../../utilities/Debugger'

const TimeDisplay = (props) => {


    return (
        <div id = "date">
            <div id = "day"> {props.time.date}</div>
            <div id = "time"> {props.time.time} </div>
        </div>
    )
}

export default TimeDisplay
