import React, { useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
import { useParams } from 'react-router-dom'

import dd from '../utilities/Debugger'


// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../context/firebaseConfig";
import { handleEmulators } from "../context/handleEmulators";

const HomePage = () => {

    useEffect(()=> {
        // Firebase stuff
        initializeApp(firebaseConfig);
        var db = getFirestore();
        //handleEmulators(db);
        console.log(db)
    }, [])



    let { user } = useContext(AuthContext)
    let { page } = useParams()

    return (
        <div id = "date">
            <div id = "day"></div>
            <div id = "time"></div>
        </div>
    )
}

export default HomePage
