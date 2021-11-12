
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
//import dd from '../../utilities/Debugger'

const CryInput = (props) => {

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    // STATE
    let [cries, setCries] = useState(0)
    let [userInteraction, setUserInteraction] = useState(false)

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {

        if (props.data.cries){
            setCries(props.data.cries)
        }

    }, [props.data.cries])

    useEffect(() => {

        if (userInteraction){
            updateEntry({
                "cries": cries
            })
        }

    }, [cries, updateEntry])


    let handleClick = (amount) => {
        if ( cries > -1 ){
            setUserInteraction(true)
            setCries(cries + amount)
        // If amount is -1, we won't allow more substractions but we do need to allow additions
        } else if (cries === -1 && Math.sign(amount) === 1){
            setCries(cries + amount)
            setUserInteraction(true)
        }
    }

    return (

        <div className = "section">
            <h3> 💧 And cried this many times:</h3>

            <button
            id = "lessCry"
            className = "btn"
            onClick = {() => handleClick(-1)}> - </button>

            <button id = "cryNumber"> {cries} </button>

            <button id = "moreCry"
            className = "btn"
            onClick = {() => handleClick(+1)}> + </button>

        </div>

    )
}

export default CryInput