import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import TimeContext from '../../context/TimeContext'
import dd from '../../utilities/Debugger'

import moment from 'moment';

const SleepInput = () => {

    let { time } = useContext(TimeContext)
    let [state, setState] = useState({
        wake: "",
        sleep: ""
    })

    let handleTimeInput = (e, sleepScenario) => {
        e.preventDefault()
        dd(e)
        let val = e.target.value
        let newData = e.nativeEvent.data
        let backSpace = e.nativeEvent.inputType === "deleteContentBackward"
        let valid = /^\d*\:?\d*$/.test(newData); // returns false if anything other than number or colon
        let newValue = state[sleepScenario]
        
        if (backSpace){
            let oneLess = val.substring(0, val.length)
            newValue = oneLess
            modifiedBackspace(val)
            //dd(modifiedBackspace(val))
        } else if (valid){
            newValue = formatTime(val)
        }

        setState({
            ...state,
            [sleepScenario]: newValue
        })

    }

    let formatTime = (val) => {

        let max = 5
        let output = val
        const len = val.length;
        const hasColon = val.includes(":")

        if (hasColon){
            if (len >= 4){
                var withoutColon = val.replaceAll(':', '')
                var potentialHours = parseInt(withoutColon.substring(0, 2));
                console.log(potentialHours);
                if (potentialHours > 12){
                    if (output.length > 3){
                        console.log("too long")
                        output = output.substring(0, 4)
                    }
                } else {
                    if (len === 5){
                
                        val = val.replaceAll(":", "");
                        output = insert(val, ":", 2)
                    }
                }
            }
        } else {
            if (len === 1){
                output = insert(val, ":", 1);
            }
        }

        return output
    }

    function insert(s, insert, index){
        const newString = s.slice(0, index) + insert + s.slice(index);
        return newString;
    }
    
    let modifiedBackspace = (val) => {
        let noColon = val.replaceAll(':', '')
        let digitOne = noColon[0] ? noColon[0] : 0
        let digitTwo = noColon[1] ? noColon[1] : 0

        if (digitOne > )
    }


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