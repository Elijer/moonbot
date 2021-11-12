
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
import dd from '../../utilities/Debugger'
//import dd from '../../utilities/Debugger'

const BCInput = (props) => {

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    let [day, setDay] = useState(0)

    useEffect(() => {

            let month = []
            for (let i = 0; i<31; i++){
                month[i] = i + 1
            }

            dd(month)

        }, [])

    return (

        <div className = "section">
            <h3>🌙 Took this birth control pill:</h3>
            <div className = "grid-container" id = "bcGrid">
            </div>
        </div>

    )
}

export default BCInput