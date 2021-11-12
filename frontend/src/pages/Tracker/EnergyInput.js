
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import RequestContext from '../../context/RequestContext'
import dd from '../../utilities/Debugger'

const EnergyInput = (props) => {

    // Options
        /// Deselection?
            // false. HTTP function will not send 0. Selection can be changed but not nullified.

    let { time } = useContext(TimeContext)
    let { updateEntry } = useContext(RequestContext)

    // STATE
    let [selection, setSelection] = useState(0)
    let [userInteraction, setUserInteraction] = useState(false)

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {

            setSelection(props.data.energy)

    }, [props.data.energy])

    useEffect(() => {

    // As it is now, energy cannot be deselected, just changed
    // To allow deselection:
    // if (selection > -1 && selection < 4){
        if (selection > 0 &&  selection < 4 && userInteraction){
            updateEntry({
                "energy": selection
            })
        }

    }, [selection, updateEntry])

    let handleSelection = (e, n) => {

        /* This block allows for deselection:
        if (selection === n)setSelection(0)
        else setSelection(n) */
        setUserInteraction(true)
        setSelection(n)
        dd(selection)
    }


    return (
        <div className = "section">
            <h3 id = "energyHeader"> ⚡️ This <span id = "dayRegion">{time.timeOfDay}</span>, I have this much energy:</h3>
            <p id = "energyNote"></p>
            <div id = "energyOptions">

                <button
                onClick = {(e) => handleSelection(e, 1)}
                className = {"btn" + (selection === 1 ? "selected" : "")}
                id = "little">Little</button>

                <button
                onClick = {(e) => handleSelection(e, 2)}
                className = {"btn" + (selection === 2 ? "selected" : "")}
                id = "some">Some</button>

                <button
                onClick = {(e) => handleSelection(e, 3)}
                className = {"btn" + (selection === 3 ? "selected" : "")}
                id = "lots">Lots</button>

            </div>
        </div>
    )
}

export default EnergyInput