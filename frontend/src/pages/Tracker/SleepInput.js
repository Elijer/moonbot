
import React, { useContext, useState, useEffect, useCallback } from 'react'
import TimeContext from '../../context/TimeContext'
import FireContext from '../../context/FireContext'
import AuthContext from '../../context/AuthContext'
import dd from '../../utilities/Debugger'
import { formatTime } from '../../utilities/utilities'
//import dd from '../../utilities/Debugger'

const SleepInput = (props) => {

    // Create reference to entry in database
    let { time } = useContext(TimeContext)
    let { db } = useContext(FireContext)
    let { user, serverURL, authTokens } = useContext(AuthContext)
    let entry = db.collection("entries").doc(time.dateString);

    // State
    let [state, setState] = useState({
        wake: "",
        sleep: "",
        wakeSaved: "",
        sleepSaved: ""
    })

    let updateEntry = useCallback(
        async(someData) => {

            dd("initiate http request to update data")

            let response = await fetch(serverURL + 'updateEntry/', {
                method: 'POST',
                headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    ...someData,
                    'creator': user.id,
                    'dateString': time.dateString,
                })
            })

            let data = await response.json()
            if (response.status === 201){
                dd(data)
            } else if (response.status === 401){
                alert("You are not authorized to update this entry")
                //setBody(props.data.body)
            } else if (response.status === 404){
                alert("The entry you are trying to edit could not be found.")
                //setBody(props.data.body)
            }
        }, [authTokens.access, serverURL, time.dateString, user.id]
    )

    let setEntryHTTP = useCallback(
        async(someData) => {

            dd("initiate http request")

            let response = await fetch(serverURL + 'updateSleep/', {
                method: 'POST',
                headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    ...someData,
                    'creator': user.id,
                    'dateString': time.dateString,
                })
            })

            let data = await response.json()
            if (response.status === 201){
                dd(data)
            } else if (response.status === 401){
                alert("You are not authorized to update this entry")
                //setBody(props.data.body)
            } else if (response.status === 404){
                alert("The entry you are trying to edit could not be found.")
                //setBody(props.data.body)
            }
        }, [authTokens.access, serverURL, time.dateString, user.id]
    )

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {

        setState({
            ...state,
            wakeSaved: props.data.wake,
            sleepSaved: props.data.sleep
        })
    }, [props.data])

    useEffect(() => {
        let wakeIsValid = validateTime(state.wake)
        let sleepIsValid = validateTime(state.sleep)

        if (wakeIsValid || sleepIsValid){

            let data = {}

            if (wakeIsValid){
                data.wake = state.wake
                dd("setting wake data")
            }

            if (sleepIsValid){
                data.sleep = state.sleep
                dd("setting sleep data")
            }

            updateEntry(data)

        }

    }, [state.wake, state.sleep, updateEntry])

    // Fired when time inputs change
    let handleTimeInput = (e, sleepScenario) => {
        e.preventDefault()
        let val = e.target.value
        let newData = e.nativeEvent.data
        let valid = /^\d*:?\d*$/.test(newData); // returns false if anything other than number or colon
        let backSpace = e.nativeEvent.inputType === "deleteContentBackward"
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
        // But this is actually just done in useEffect for any state.sleep or state.wake changes
/*         setEntry({
            [sleepScenario]: newValue
        }) */

    }

/*     let handleBlur = (e, sleepScenario) => {
        let val = e.target.value
        let valid = validateTime(val)
        if (valid){
            setEntry({
                [sleepScenario]: val
            })
        }
    } */

    let validateTime = (val) => {
        let regex = /^(([0-9]{1}|1[0-2]{1}):[0-5]{1}[0-9]{1}){1}$/y
        let valid = regex.test(val) 
        return valid
    }

    return (

        <div className = "section" id = "sleep-input">
            🛌 Bed
            <span className = "timeInputContainer">
                <input id = "nightInput"
                className = "timeInput"
                maxLength = "5"
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