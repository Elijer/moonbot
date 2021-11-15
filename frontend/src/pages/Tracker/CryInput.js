
import React, { useContext, useState, useEffect } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
//import dd from '../../utilities/Debugger'

const CryInput = (props) => {

    //let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    // STATE
    let [cries, setCries] = useState(0)
    let [userInteraction, setUserInteraction] = useState(false)
    let [saved, setSaved] = useState("")

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

        setSaved("saved")

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
                <div className = "section-header"> 💧 And cried this many times:</div>

                <button
                className = "button"
                onClick = {() => handleClick(-1)}> - </button>

                <button id = "cryNumber" className = {"button " + saved}> {cries} </button>

                <button
                className = "button"
                onClick = {() => handleClick(+1)}> + </button>
                
                {cries > 30 &&
                <div className = "special-message"> Good god that's a lot of crying! Take care to keep hydrating, take a rest, and do something nice for yourself. </div>}
                
                {cries > 50 && 
                <div className = "special-message"> Jesus. You are really having a crazy day and I feel for you. It's okay to ask for help -- I recommend you call someone, even if it's just to tell them that you cried your eyes out today. </div>}

            </div>
    )
}

export default CryInput