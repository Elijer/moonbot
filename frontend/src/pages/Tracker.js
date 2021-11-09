import React, { useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import TimeContext from '../context/TimeContext'
import { Posts } from '../components/Posts'
import { useParams } from 'react-router-dom'

import TimeDisplay from './Tracker/TimeDisplay'

import moment from 'moment';

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
        </div>
    )
}

export default Tracker
