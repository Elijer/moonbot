import React, { useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
import { useParams } from 'react-router-dom'

import moment from 'moment';

import dd from '../utilities/Debugger'

const Tracker = () => {

    let { user } = useContext(AuthContext)
    let { page } = useParams()

    useEffect(()=> {

    // get date
    var state = {};
    var theMoment = moment();
    state.date = moment().format('L');
    state.fsDate = state.date.replace(/\//g, "-");
    dd(state.fsDate)

    }, [])


    return (
        <div id = "date">
            <div id = "day"></div>
            <div id = "time"></div>
        </div>
    )
}

export default Tracker
