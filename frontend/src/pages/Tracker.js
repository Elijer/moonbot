import React, { useContext, useEffect, useState } from 'react'

import TimeDisplay from './Tracker/TimeDisplay'
import SleepInput from './Tracker/SleepInput'
import FireContext from '../context/FireContext'
import AuthContext from '../context/AuthContext'
import dd from '../utilities/Debugger'

//import dd from '../utilities/Debugger'

const Tracker = () => {

    let { db, time } = useContext(FireContext)
    let { user, authTokens, serverURL } = useContext(AuthContext)
    //let entryRef = db.collection("entries").doc(time.dateString);
    let [entryData, setEntryData] = useState({})

    useEffect(() => {

        getEntry({
            datString: time.dateString
        })

/*         entryRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                setEntryData(data)
            }
        }) */

    }, [])

    let getEntry = async(someData) => {

        dd("initiate http request")

        let response = await fetch(serverURL + 'getEntry/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                'dateString': time.dateString,
            })
        })

        let data = await response.json()
        if (response.status === 200){
            setEntryData(data)
        } else if (response.status === 401){
            alert("You are not authorized to update this entry")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The entry you are trying to edit could not be found.")
            //setBody(props.data.body)
        }
    }


    return (
        <div id = "tracker">
            < TimeDisplay />
            < SleepInput data= {entryData} user = {user} />
        </div>
    )
}

export default Tracker
