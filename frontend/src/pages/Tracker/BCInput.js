
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
//import dd from '../../utilities/Debugger'

const BCInput = (props) => {

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    // STATE

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
/*     useEffect(() => {

        if (props.data.cries){
            setCries(props.data.cries)
        }

    }, [props.data.cries]) */

/*     useEffect(() => {

        updateEntry({
            "cries": cries
        })

    }, [cries, updateEntry]) */


/*     let handleClick = (amount) => {
        if ( cries > -1 ){
            setCries(cries + amount)
        // If amount is -1, we won't allow more substractions but we do need to allow additions
        } else if (cries === -1 && Math.sign(amount) === 1){
            setCries(cries + amount)
        }
    }
 */
    return (

        <div class = "section">
            <h3>🌙 Took this birth control pill:</h3>
            <div class = "grid-container" id = "bcGrid">
            </div>
        </div>

    )
}

export default BCInput