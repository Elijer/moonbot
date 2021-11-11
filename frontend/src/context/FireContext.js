import { createContext, useState, useEffect, useContext} from 'react'
//import TimeContext from './TimeContext'
import dd from '../utilities/Debugger'

//import { useCollectionData } from 'react-firebase-hooks/firestore'

const FireContext = createContext()

export default FireContext

export const FireProvider = ({children}) => {

    //let { time } = useContext(TimeContext)

    let [database, setDatabase] = useState({})
    //let [entryRef, setEntryRef] = useState({})
    let [loading, setLoading] = useState(false)

    useEffect(()=> {

        if (loading === false){
        }

    }, [])

    let contextData = {
        db: "hey"
    }

    return (
        <FireContext.Provider value = {contextData}>
            {children}
        </FireContext.Provider>
    )

}