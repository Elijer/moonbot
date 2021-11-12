
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
import dd from '../../utilities/Debugger'

const CryInput = (props) => {

    // Options
        /// Deselection?
            // false. HTTP function will not send 0. Selection can be changed but not nullified.

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    // STATE
    let [cryAmount, setCryAmount] = useState(0)

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
/*     useEffect(() => {

            setSelection(props.data.energy)

    }, [props.data.energy]) */

/*     useEffect(() => {

    // As it is now, energy cannot be deselected, just changed
    // To allow deselection:
    // if (selection > -1 && selection < 4){
        if (selection > 0 &&  selection < 4){
            updateEntry({
                "energy": selection
            })
        }

    }, [selection, updateEntry]) */

    let handleClick = (amount) => {
        if ( cryAmount > -1 )
        setCryAmount(cryAmount + amount)
    }

    return (

        <div className = "section">
            <h3> 💧 And cried this many times:</h3>

            <button
            id = "lessCry"
            className = "btn"
            onClick = {() => handleClick(-1)}> - </button>

            <button id = "cryNumber"> {cryAmount} </button>

            <button id = "moreCry"
            className = "btn"
            onClick = {() => handleClick(+1)}> + </button>

        </div>

    )
}

export default CryInput