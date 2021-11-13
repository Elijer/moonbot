import React, { useContext, useEffect, useState } from 'react'
import dd from '../utilities/Debugger'

const Log = () => {

    let { user, authTokens, serverURL } = useContext(AuthContext)
    let [data, setData] = useState({})

    useEffect(() => {

        setData(props.data)

    }, [props.data])

    return (
        <div>
            Log

            < Rechart_1 data = {data}> </ Rechart_1 >

        </div>
    )
}

export default Log
