
import React, { useContext, useState, useEffect } from 'react'
import RequestContext from '../../context/RequestContext'
import { formatTime } from '../../utilities/utilities'

import dd from '../../utilities/Debugger'

const SleepInput = (props) => {

    let { updateEntry } = useContext(RequestContext)

    // State
    let [state, setState] = useState({
        wake: "",
        sleep: "",
        wakeSaved: "",
        sleepSaved: "",
        sleepDomain: "pm",
        wakeDomain: "am"
    })

    let [time, setTime] = useState({})

    let [userInteraction, setUserInteraction] = useState(false)

    // Props not available on first render -- must be saved to state here in useEffect
    // props.data needed as dependency
    useEffect(() => {

        setTime(props.time)
        
        setState({
            ...state,
            wakeSaved: props.data.wake,
            sleepSaved: props.data.sleep,
            wakeDomain: props.data.wakeDomain ? props.data.wakeDomain : state.wakeDomain,
            sleepDomain: props.data.sleepDomain ? props.data.sleepDomain : state.sleepDomain,
        })

    }, [props.data.wake, props.data.sleep, props.data.wakeDomain, props.data.sleepDomain, props.time])

    // set wake and sleep times
    useEffect(() => {

        let wakeIsValid = validateTime(state.wake)
        let sleepIsValid = validateTime(state.sleep)

        if (wakeIsValid || sleepIsValid){


            // current task -- making sure sleep and wake Domain data getting saved to DB along with other stuff
            let data = {}

            if (wakeIsValid){
                data.wake = state.wake
                dd("setting wake data")
            }

            if (sleepIsValid){
                data.sleep = state.sleep
                dd("setting sleep data")
            }

            if (userInteraction) updateEntry(data)
        }

    }, [state.wake, state.sleep, updateEntry])


    // set new wakeDomain value
    useEffect(() => {
        let data = {}
        data.wakeDomain = state.wakeDomain
        if (userInteraction) updateEntry(data)

    }, [state.wakeDomain, updateEntry])

    // set new sleepDomain value
    useEffect(() => {
        let data = {}
        data.sleepDomain = state.sleepDomain
        if (userInteraction) updateEntry(data)
    }, [state.sleepDomain, updateEntry])

    let handleAMPM = (sleepScenario) => {

        setUserInteraction(true)

        let AMPMproperty = `${sleepScenario}Domain`
        let newVal;
        if (state[AMPMproperty] === "am"){
            newVal = "pm"
        } else if (state[AMPMproperty] === "pm"){
            newVal = "am"
        }

        setState({
            ...state,
            [AMPMproperty]: newVal
        })
    }

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
        setUserInteraction(true)
        setState({
            ...state,
            [sleepScenario]: newValue
        })

    }

    let validateTime = (val) => {
        let regex = /^(([0-9]{1}|1[0-2]{1}):[0-5]{1}[0-9]{1}){1}$/y
        let valid = regex.test(val) 
        return valid
    }

    return (

        <h3 className = "section section-header">
            🛌 Bed
            <span className = "timeInputContainer">
                <input
                className = "timeInput"
                maxLength = "5"
                placeholder = { state.sleepSaved }
                onChange = {(e) => handleTimeInput(e, "sleep")}
                value = {state.sleep} />
            </span>
            <span
            className = "AMPM"
            onClick = {() => handleAMPM("sleep")}>{state.sleepDomain}</span>
            , woke
            <span className = "timeInputContainer">
                <input
                className = "timeInput"
                maxLength = "5"
                placeholder = { state.wakeSaved }
                onChange = {(e) => handleTimeInput(e, "wake")}
                value = {state.wake} />
            </span>
            <span
            className = "AMPM"
            onClick = {() => handleAMPM("wake")}>{state.wakeDomain}</span>.
        </h3>
    )
}

export default SleepInput