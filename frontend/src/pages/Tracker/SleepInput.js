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
        let val = e.target.value
        let newData = e.nativeEvent.data
        let backSpace = e.nativeEvent.inputType === "deleteContentBackward"
        let valid = /^\d*\:?\d*$/.test(newData); // returns false if anything other than number or colon
        let newValue = state[sleepScenario]
        
        if (backSpace){
            let oneLess = val.substring(0, val.length)
            newValue = formatTime(oneLess, state[sleepScenario])
            //modifiedBackspace(val)
            //dd(modifiedBackspace(val))
        } else if (valid){
            newValue = formatTime(val, state[sleepScenario])
        }

        setState({
            ...state,
            [sleepScenario]: newValue
        })

    }

    let formatTime2 = (val) => {
        let noColon = val.replaceAll(':', '')
        let hadZero = false;
        if (noColon[0] === 0){
            noColon.substring(1, noColon.length)
            hadZero = true; // we could add it back in at the very end if we want
        }
        let digitOne = parseInt(noColon[0] ? noColon[0] : 0)
        let digitTwo = parseInt(noColon[1] ? noColon[1] : 0)
        let hours = parseInt(noColon.substring(0, 2));
        let len = noColon.length

        // Assumptions
            // the noColon value we are reading has no colons
            // its first digit is NOT 0

        // Rules
        
            // Under no circumstances can first two digits be 00
            // There may not be more than 4 digits
            // Under the following circumstances, there may not be more than 3 digits:
                // if first two digits are more than 12
                // if the first two digits read together are less than 10
                // If the first two digits read together are more than 12
                // if the third digit is more than 5

            // if there can only be three digits, a colon must be added at position 2
            // if there are four digits, a colon must be added to position 3

        // Additional Validation
            // there must be at least 3 digits when form is left or form is invalid, and will be cleared to show
            // That no valid value exists
    }

    let formatTime = (val) => {
        let noColon = val.replaceAll(':', '')
        let digitOne = parseInt(noColon[0] ? noColon[0] : 0)
        let digitTwo = parseInt(noColon[1] ? noColon[1] : 0)
        let potentialHours = parseInt(noColon.substring(0, 2));
        let len = noColon.length // is 0 when empty // shouldn't be more than 4, maybe enforce that here
        let output;
        let colonPosition = 0;

        if (len === 2){
            if (parseInt(noColon[1]) > 5){
                noColon = noColon.substring(0, len-1)
            }
        }
        
        if (len < 3){
            
            output = noColon

        } else {

            if (potentialHours > 12){
                colonPosition = 1
            } else if (potentialHours > 9){
                // length must be at least 2 for this to be possible
                if (len < 4){
                    colonPosition = 1
                } else {
                    colonPosition = 2
                }
            } else {
                if (digitOne > 1){
                    colonPosition = 1
                } else {
                    colonPosition = 2
                }
            }

        }

        if (parseInt(noColon[2]) > 5){
            colonPosition = 1
        }

        if (parseInt(noColon[0]) === 0){
            if (parseInt(noColon[1]) === 0){
                colonPosition = -1
            }
        }

        switch (colonPosition){
            case -1:
                output = 0
                break;
            case 0: // no colon
                output = noColon
                break;
            case 1: // colon after first digit
                output = insert(noColon, ":", 1).substring(0, 4)
                break;
            case 2: // colon after second digit
                output = insert(noColon, ":", 2).substring(0, 5)
                break;
        }

        return output

    }

/*     let formatTime = (val) => {

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
    } */

    function insert(s, insert, index){
        const newString = s.slice(0, index) + insert + s.slice(index);
        return newString;
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