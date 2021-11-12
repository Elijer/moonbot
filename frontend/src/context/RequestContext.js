import { createContext, useContext, useCallback} from 'react'

import TimeContext from './TimeContext'
import AuthContext from './AuthContext'

import dd from '../utilities/Debugger'

const RequestContext = createContext()

export default RequestContext

export const RequestProvider = ({children}) => {

    let { time } = useContext(TimeContext)
    let { user, serverURL, authTokens } = useContext(AuthContext)
    
    let updateEntry = useCallback(
        async(someData) => {

            //dd("initiate http request to update data")
        
            let response = await fetch(serverURL + 'updateEntry/', {
                method: 'POST',
                headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    ...someData,
                    'creator': user.id,
                    'dateString': time.dateString,
                })
            })
        
            let data = await response.json()
            if (response.status === 201){
                //dd(data)
            } else if (response.status === 401){
                alert("You are not authorized to update this entry")
                //setBody(props.data.body)
            } else if (response.status === 404){
                alert("The entry you are trying to edit could not be found.")
                //setBody(props.data.body)
            }
        },

        // Dependency array
        [authTokens?.access, serverURL, time.dateString, user?.id]
    )
    

    let contextData = {
        updateEntry: updateEntry
    }

    return (
        <RequestContext.Provider value = {contextData}>
            {children}
        </RequestContext.Provider>
    )

}