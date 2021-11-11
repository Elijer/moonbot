
import React, { useContext, useState, useEffect, useRef } from 'react'
//import AuthContext from '../../context/AuthContext'
import TimeContext from '../../context/TimeContext'
import FireContext from '../../context/FireContext'
import dd from '../../utilities/Debugger'
import { insert, formatTime } from '../../utilities/utilities'
//import dd from '../../utilities/Debugger'

const SleepInput = (props) => {

    // Create reference to entry in database
    let { time } = useContext(TimeContext)
    let { db } = useContext(FireContext)
    let entry = db.collection("entries").doc(time.dateString);

    // State
    let [state, setState] = useState({
        wake: "",
        sleep: "",
        wakeSaved: "",
        sleepSaved: ""
    })

    // Send time data to database
    let setEntry = async (data) => {
        try {
            let response = await entry.set(data, {merge: true})
            return response
        } catch(err){
            dd(err)
            throw err
        }
    }


    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {
        setState({
            ...state,
            wakeSaved: props.data.wake,
            sleepSaved: props.data.sleep
        })
    }, [props.data])

    // Fired when time inputs change
    let handleTimeInput = (e, sleepScenario) => {
        e.preventDefault()
        let val = e.target.value
        let newData = e.nativeEvent.data
        let backSpace = e.nativeEvent.inputType === "deleteContentBackward"
        let valid = /^\d*:?\d*$/.test(newData); // returns false if anything other than number or colon
        let newValue = state[sleepScenario]
        
        if (backSpace){
            let oneLess = val.substring(0, val.length)
            newValue = formatTime(oneLess)
        } else if (valid){
            newValue = formatTime(val)
        }

        // set state
        setState({
            ...state,
            [sleepScenario]: newValue
        })

        // set data in firestore
        setEntry({
            [sleepScenario]: newValue
        })

        dd("wake: " + state.wake, "sleep: " + state.sleep)
    }

    return (

        <div className = "section" id = "sleep-input">
            🛌 Bed
            <span className = "timeInputContainer">
                <input id = "nightInput"
                className = "timeInput"
                maxLength = "5"
                //onBlur = {(e) => validateTimeData(e)}
                placeholder = { state.sleepSaved }
                onChange = {(e) => handleTimeInput(e, "sleep")}
                value = {state.sleep} />
            </span>
            , woke
            <span className = "timeInputContainer">
                <input id = "morningInput"
                className = "timeInput"
                maxLength = "5"
                placeholder = { state.wakeSaved }
                onChange = {(e) => handleTimeInput(e, "wake")}
                value = {state.wake} />
            </span>.
        </div>
    )
}

export default SleepInput






// Logic blueprint for 

        // Assumptions
            // the noColon value we are reading has no colons (x)
            // its first digit is NOT 0 (x)
            // third digit can't be more than 5

        // Rules
        
            // Under no circumstances can second digit be 0 (x)
            // There may not be more than 4 digits (x)
            // Under the following circumstances, there may not be more than 3 digits:
                // if first two digits are more than 12
                // if the first two digits read together are less than 10
                // If the first two digits read together are more than 12
                // if the third digit is more than 5
                // there currently ARE only three digits

            // if there are only two digits, there must be no colons
            // if there can only be three digits, a colon must be added at position 2
            // if there are four digits, a colon must be added to position 3

        // Additional Validation
            // there must be at least 3 digits when form is left or form is invalid, and will be cleared to show
            // That no valid value exists