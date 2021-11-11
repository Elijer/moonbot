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

    useEffect(()=> {


            // app = firebase.initiazeApp()
            firebase.initializeApp(firebaseConfig)
                
            const firestore = firebase.firestore()
            handleEmulators(firestore);
            if (firestore._delegate.type === "firestore"){
                setDB(firestore)
                console.log("We got the db object!", db)
            }

    }, [])

    let contextData = {
        db: db
    }

    return (
        <FireContext.Provider value = {contextData}>
            {children}
        </FireContext.Provider>
    )

}