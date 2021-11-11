import { createContext, useState, useEffect} from 'react'
import { handleEmulators } from './Firestore/handleEmulators'
import { firebaseConfig } from './Firestore/firebaseConfig'
//import dd from '../utilities/Debugger'

// Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

//import { useCollectionData } from 'react-firebase-hooks/firestore'

const FireContext = createContext()

export default FireContext


export const FireProvider = ({children}) => {

    let [db, setDB] = useState({})
    let [loading, setLoading] = useState(false)

    useEffect(()=> {

        (async () => {
            if (loading === false){

                // app = firebase.initiazeApp()
                firebase.initializeApp(firebaseConfig)
                    
                const firestore = firebase.firestore()
                handleEmulators(firestore);
                if (firestore._delegate.type === "firestore"){
                    setDB(firestore)
                    setLoading(false)
                    console.log("We got the db object!", db)
                }
    
            }
        })()

    }, [db, loading])

    let contextData = {
        db: db
    }

    return (
        <FireContext.Provider value = {contextData}>
            {children}
        </FireContext.Provider>
    )

}