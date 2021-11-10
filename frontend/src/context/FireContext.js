import { createContext, useState, useEffect} from 'react'
import moment from 'moment';
import dd from '../utilities/Debugger'

const FireContext = createContext()

export default FireContext


export const FireProvider = ({children}) => {

/*     let [time, setTime] = useState({
        time: "",
        date: "",
        dateString: "",
        timeOfDay: ""
    })

    let [loading, setLoading] = useState(false) */

    useEffect(()=> {
/*         if (loading === false){
            let m = moment()

            setTime({
                time: m.format('h:mm a'),
                date: m.format('dddd, MMM Do'),
                dateString: m.format('L').replace(/\//g, "-"),
                timeOfDay: getTimeOfDay(m)
            });

            setLoading(false)

        } */
    }, [])

    let contextData = {
        db: db
    }

    return (
        <FireContext.Provider value = {contextData}>
            {loading ? null : children}
        </FireContext.Provider>
    )

}