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

    let [theMoment, setTheMoment] = useState(moment())
    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    let [DBDate, setDBDate] = useState("")

    useEffect(()=> {

        let m = moment()
        setTime(m.format('h:mm a'))
        setDate(m.format('dddd, MMM Do'))
        setDBDate(m.format('L').replace(/\//g, "-"))


    // get date
/*     let date = theMoment.format('L');
    let entryDate = date.replace(/\//g, "-");
    setDate(entryDate) */


/*     dateElement.innerHTML = m.format('dddd, MMM */
/*     timeElement.innerHTML = m.format('h:mm a'); */
    
    // Get Time
    //var timeOfDay = getTimeOfDay(theMoment);
    //state.timeOfDay = timeOfDay

    }, [])


    return (
        <div id = "date">
            <div id = "day"> {date}</div>
            <div id = "time"> {time} </div>
        </div>
    )
}

export default Tracker
