import { createContext, useState, useEffect} from 'react'
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

                const app = firebase.initializeApp({
                    apiKey: "AIzaSyCfcluagAp51tAuLFk_-2JqdpGFsZ5t4d4",
                    authDomain: "m00nb0t.firebaseapp.com",
                    projectId: "m00nb0t",
                    storageBucket: "m00nb0t.appspot.com",
                    messagingSenderId: "717345603721",
                    appId: "1:717345603721:web:5a7c8e88fc43f9e97a8658",
                    measurementId: "G-5TJ0NFDXVY"
                })
                    
                const firestore = firebase.firestore()
                if (firestore._delegate.type === "firestore"){
                    setDB(firestore)
                    setLoading(false)
                    console.log("We got the db object!", db)
                }
    
            }
        })()

    }, [db])

    let contextData = {
        db: db
    }

    return (
        <FireContext.Provider value = {contextData}>
            {children}
        </FireContext.Provider>
    )

}