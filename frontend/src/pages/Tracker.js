import React, { useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
import { useParams } from 'react-router-dom'

import moment from 'moment';

import dd from '../utilities/Debugger'

const Tracker = () => {

    let { user } = useContext(AuthContext)
    let { page } = useParams()

    let [time, setTime] = useState({
        time: "",
        date: "",
        dateString: "",
        timeOfDay: ""
    })

    useEffect(()=> {
        let m = moment()
        setTime({
            time: m.format('h:mm a'),
            date: m.format('dddd, MMM Do'),
            dateString: m.format('L').replace(/\//g, "-"),
            timeOfDay: getTimeOfDay(m)
        });
    }, [])

    var getTimeOfDay = function(m){
        var timeOfDay;
        var morningStart = moment('2:00am', 'h:mma');
        var morningEnd = moment('11:59am', 'h:mma');
        var middayEnd = moment('6:00pm', 'h:mma');
    
        if (m.isBefore(middayEnd) && m.isAfter(morningEnd)){
            timeOfDay = "midday"
            //midday
        } else if (m.isBefore(morningEnd) && m.isAfter(morningStart)){
            timeOfDay = "morning";
            //morning
        } else if (m.isAfter(middayEnd)){
           timeOfDay = "evening";
            //evening
        } else {
            // after midnight
            timeOfDay = "evening";
        }
        return timeOfDay
    }


    return (
        <div id = "date">
            <div id = "day"> {time.date}</div>
            <div id = "time"> {time.time} </div>
        </div>
    )
}

export default Tracker
