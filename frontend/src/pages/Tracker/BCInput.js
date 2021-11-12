
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
import dd from '../../utilities/Debugger'
//import dd from '../../utilities/Debugger'

const BCInput = (props) => {

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    let [day, setDay] = useState(0)
    let [userInteraction, setUserInteraction] = useState(false)
    //let [month, setMonth] = useState

    // Create dirt simple month array to map through
    let month = []
    for (let i = 0; i<28; i++){
        month[i] = i + 1
    }

        // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {

        if (props.data.BC_day){
            setDay(props.data.BC_day)
        }

    }, [props.data.BC_day])

    useEffect(() => {
        if (userInteraction){
            updateEntry({
                "BC_day": day
            })
        }

    }, [day, updateEntry])

    let handleClick = (i) => {
        setUserInteraction(true)
        setDay(i)
    }

    return (

        <div className = "section">
            <div className = "section-header">🌙 Took this birth control pill:</div>
            <div className = "grid-container">

                {month.map((i) =>
                <div
                key = {`BC-day-${i}`}
                className = {(i === day ? "saved" : "") + " grid-item"}
                onClick = {() => handleClick(i)}> {i} </div>)}
            </div>

        </div>

    )
}

export default BCInput