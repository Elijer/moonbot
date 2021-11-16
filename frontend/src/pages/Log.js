import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Rechart_1 from '../charts/Rechart_1'
import moment from 'moment';
import Rechart_Linechart_1 from '../charts/Rechart_Linechart_1'
import dd from '../utilities/Debugger'

const Log = () => {

    let { user, authTokens, serverURL } = useContext(AuthContext)
    let [data, setData] = useState({})
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading = true){
            setLoading(false)
            getData()
        }

    }, [loading])

    let getData = async() => {

        let response = await fetch(serverURL + 'graphAllEntries/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        let someData = await response.json()
        if (response.status === 200){
            let reformatted = []
            let count = 0
            someData.entries.forEach(element => {
                element.energy = element.energy * 5
                let m = moment(element.dim)
                let niceDate = m.format("MMM D");
                element.niceDate = niceDate
            });
            setData(someData.entries)
        } else if (response.status === 401){
            setLoading(false)
            alert("You are not authorized to update this entry")
            //setBody(props.data.body)
        } else if (response.status === 404){
            setLoading(false)
            alert("The entry you are trying to edit could not be found.")
            //setBody(props.data.body)
        }
    }

    return (
        <div>

            < Rechart_1 data = {data}> </ Rechart_1 >
            < div> </div>
            
        </div>
    )
}

export default Log
