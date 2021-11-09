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

    let [date, setDate] = useState("")

    useEffect(()=> {

    // get date
    let date = moment().format('L');
    let entryDate = date.replace(/\//g, "-");
    setDate(entryDate)

    }, [])


    return (
        <div id = "date">
            <div id = "day"> {date}</div>
            <div id = "time"> time:time </div>
        </div>
    )
}

export default Tracker
