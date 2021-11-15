import { createContext, useState, useEffect} from 'react'
import moment from 'moment';
//import dd from '../utilities/Debugger';

const TimeContext = createContext()

export default TimeContext

export const TimeProvider = ({children}) => {

    let [time, setTime] = useState({
        time: "",
        date: "",
        dateString: "",
        timeOfDay: "",
        timezone: ""
    })

    let [loading, setLoading] = useState(false)
    let [loadingTimeZone, setLoadingTimeZone] = useState(false)

    useEffect(()=> {
        if (loading === false){
            let m = moment()

            setTime({
                time: m.format('h:mm a'),
                date: m.format('dddd, MMM Do'),
                dateString: m.format('L').replace(/\//g, "-"),
                timeOfDay: getTimeOfDay(m)
            });

            setLoading(false)

        }
    }, [loading])

    useEffect(()=> {
        if (loadingTimeZone === false){
            let m = moment()
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

            setTime({
                ...time,
                timezone: tz
            });

            setLoadingTimeZone(false)

        }
    }, [loadingTimeZone])

    var getTimeOfDay = function(m){
        var timeOfDay;
        var morningStart = moment('2:00am', 'h:mma');
        var morningEnd = moment('11:59am', 'h:mma');
        var middayEnd = moment('6:00pm', 'h:mma');
    
        if (m.isBefore(middayEnd) && m.isAfter(morningEnd)){
            timeOfDay = "midday"
            //midday
        } else if (m.isBefore(morningEnd) && m.isAfter(morningStart)){
            timeOfDay = "morning";
            //morning
        } else if (m.isAfter(middayEnd)){
           timeOfDay = "evening";
            //evening
        } else {
            // after midnight
            timeOfDay = "evening";
        }
        return timeOfDay
    }

    let contextData = {
        time: time
    }

    return (
        <TimeContext.Provider value = {contextData}>
            {/* Load children even if time hasn't loaded yet to minimize re-renders */}
            {loading ? null : children}
        </TimeContext.Provider>
    )

}