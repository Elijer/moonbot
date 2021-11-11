
import React, { useContext, useState, useEffect } from 'react'
//import AuthContext from '../../context/AuthContext'
import TimeContext from '../../context/TimeContext'
import FireContext from '../../context/FireContext'
import dd from '../../utilities/Debugger'
//import dd from '../../utilities/Debugger'

const SleepInput = () => {

    let { time } = useContext(TimeContext)
    let { db } = useContext(FireContext)
    let entry = db.collection("entries").doc(time.dateString);

    let setEntry = async (data) => {
        let response = await entry.set(data, {merge: true})
        return response
    }

/*     useEffect(() => {
        dd(db)
    }, []) */

    //let { time } = useContext(TimeContext)
    let [state, setState] = useState({
        wake: "",
        sleep: ""
    })

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
            //modifiedBackspace(val)
            //dd(modifiedBackspace(val))
        } else if (valid){
            newValue = formatTime(val)
        }

        setState({
            ...state,
            [sleepScenario]: newValue
        })

        dd(setEntry({
            [sleepScenario]: newValue
        }))
    }

    let formatTime = (val) => {

        // prepare val into noColon string
        let noColon = val.replaceAll(':', '')// get rid of all colons
        if (parseInt(noColon[0]) === 0) noColon = noColon.substring(1, noColon.length) // if noColon starts with 0, drop it
        noColon = noColon.substring(0, 4) // and ensure noColon doesn't exceed 4 digits
        let hours = parseInt(noColon.substring(0, 2)); // get the first two digits as a number
        let output = noColon // create variable function will return

        if (parseInt(noColon[1]) > 5) noColon = noColon[0] // The second character can't be more than 5: If it is, cut it out and continue

        if (noColon.length < 2) output = noColon // If there's only one digit, don't add any colons -- this prevents full deletion
        else if (

            hours > 15 // but 13, 14 and 15 can create valid 3 digit hours too (1:32, 1:59, etc.)
            || noColon[2] > 5 // if third digit is more than 5, 1:26 , 4 digits aren't valid. ex. 12:61
            || noColon.length < 4 // If digits are 3 or fewer, we'll want colon here "0:00" anyways

        ) output = insert(noColon, ":", 1).substring(0, 4) // Format to 3 digits: 0:00

        else output = insert(noColon, ":", 2).substring(0, 5) // Format to 4 digits: 00:00

        return output
    }

    function insert(s, insert, index){
        const newString = s.slice(0, index) + insert + s.slice(index);
        return newString;
    }

    //dd("how many times?")

    return (

        <div className = "section" id = "sleep-input">
            🛌 Bed
            <span className = "timeInputContainer">
                <input id = "nightInput"
                className = "timeInput"
                maxLength = "5"
                onChange = {(e) => handleTimeInput(e, "sleep")}
                value = {state.sleep} />
            </span>
            , woke
            <span className = "timeInputContainer">
                <input id = "morningInput"
                className = "timeInput"
                maxLength = "5"
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