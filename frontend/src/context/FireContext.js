
import { createContext } from 'react'
import { handleEmulators } from './Firestore/handleEmulators'
import { firebaseConfig } from './Firestore/firebaseConfig'
//import dd from '../utilities/Debugger'

// Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const FireContext = createContext()

export default FireContext

export const FireProvider = ({children}) => {

    let createDB = () => {
            firebase.initializeApp(firebaseConfig)
            const firestore = firebase.firestore()
            handleEmulators(firestore);
            return firestore
    }

    let db = createDB()

    let contextData = {
        db: db,
    }

    return (
        <FireContext.Provider value = {contextData}>
            {children}
        </FireContext.Provider>
    )

}