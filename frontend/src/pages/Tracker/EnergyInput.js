
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import FireContext from '../../context/FireContext'
import AuthContext from '../../context/AuthContext'
import dd from '../../utilities/Debugger'
import { formatTime } from '../../utilities/utilities'
//import dd from '../../utilities/Debugger'

const EnergyInput = (props) => {

    // Create reference to entry in database
    let { time } = useContext(TimeContext)
    let { user, serverURL, authTokens } = useContext(AuthContext)

    let [selection, setSelection] = useState(0)

    let handleSelection = (n) => {
        //set
    }


    return (
        <div className = "section">
            <h3 id = "energyHeader"> ⚡️ This <span id = "dayRegion">{time.timeOfDay}</span>, I have this much energy:</h3>
            <p id = "energyNote"></p>
            <div id = "energyOptions">

                <button
                onChange = {(e) => handleSelection(e, 1)}
                className = {"btn" + (selection === 1 ? "selected" : "")}
                id = "little">Little</button>

                <button
                onChange = {(e) => handleSelection(e, 2)}
                className = {"btn" + (selection === 2 ? "selected" : "")}
                id = "some">Some</button>

                <button
                onChange = {(e) => handleSelection(e, 3)}
                className = {"btn" + (selection === 3 ? "selected" : "")}
                id = "lots">Lots</button>

            </div>
        </div>
    )
}

export default EnergyInput