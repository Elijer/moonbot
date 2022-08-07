import { createContext, useState, useEffect, useCallback} from 'react'
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import Config from './Config'
import dd from '../utilities/Debugger'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    // This AuthProvider component was heavily inspired by Dennis Ivy
    // He shared his method for using JWT tokens to store persistent access and refresh tokens
    // In a user's local storage for authentication, similar to what Django seems to do automatically
    // He shared his code publicly in the youtube video: "Authentication & Refreshing Tokens Implementation" https://www.youtube.com/watch?v=xjMP0hspNLE
    // And in the github repository here: https://github.com/divanov11/refresh-token-interval
    // To make this component, I used his code as a base 11/04/2021

    // We saved the access token to localStorage
    let cookie = localStorage.getItem('authTokens')

    let [ authTokens, setAuthTokens ] = useState(() => {
        const authTokens = cookie ? JSON.parse(cookie) : null;
        return authTokens
    })

    let [ user, setUser ] = useState(() => {
        if (cookie){
            const decoded_user = jwt_decode(cookie)
            return decoded_user
        } else {
            // no user
            return null
        }
    })

    let [settings, setSettings] = useState({})

    const [loginAttempt, setLoginAttempt] = useState(false)
    const [loading, setLoading] = useState(true)

    const history = useHistory()


    // This function decodes and extrapolates data encoded in authTokens.access
    // It creates the uppercaseUsername property, and renames user_id to id for clarity
    let custom_jwt_decode = (access) => {
        let data = jwt_decode(access)
        data.id = data.user_id
        data.uppercaseUsername = data.username[0].toUpperCase() + data.username.substring(1)
        delete data.user_id
        //dd(data)
        return data
    }

    let loginEvent = (data)=> {
        setAuthTokens(data)

        // create the user object with all use information for access throughout application
        const userObj = custom_jwt_decode(data.access) // decode username from access code
        setUser(userObj)
        localStorage.setItem('authTokens', JSON.stringify(data))
        history.push('/') // send user to home page, which they can only access if logged in
    }

    let loginUser = async (e) => {
        //this is where a loading thingy would go
        e.preventDefault() //prevents page from refreshing
        dd('Form Submitted', e) 
        
        let response = await fetch(Config.serverURL + 'api/token/', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        })

        // wait for response
        let data = await response.json()

        if (response.status === 200){
            data.username = jwt_decode(data.access).username
            loginEvent(data) // log user in
            setLoginAttempt(false)
            return "success"
        } else {
            setLoginAttempt(true)
            dd("Something went wrong -- you probably supplied the wrong login credentials")
            return "loginError"
        }
    }

    let logoutUser = useCallback(
        () => {
            history.push('/login')
            setAuthTokens(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            setLoginAttempt(false)
            setLoading(true)
        },
        [history]
    )

    let registerUser = async (e) => {
        e.preventDefault()
        let form = e.target;
        dd('Form Submitted', form)
        
        let response = await fetch(Config.serverURL + 'api/register/', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': form.username.value,
                "email": form.email?.value,
                "password": form.password.value,
                "confirmation": form.confirmation.value
            })
        })

        let data = await response.json()
        if (response.status === 200){
            loginEvent(data)
            setLoginAttempt(false)
        } else {
            setLoginAttempt(true)
            dd("error")
        }

    }
    
    let clearLoginAttempt = () => {
        setLoginAttempt(false)
    }

    let updateToken = useCallback(
        async () => {
            dd("fetching api/token/refresh to update token")
            let response = await fetch(Config.serverURL + 'api/token/refresh/', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'refresh': authTokens?.refresh // the question mark apparently prevents this fetch call from getting used if it doesn't exist, preventing errors
                })
            })
    
            // wait for response
            let data = await response.json()
    
            if (response.status === 200){
                // save tokens to state AND local storage
                setAuthTokens(data)
                setUser(custom_jwt_decode(data.access)) // decode user out of the access code
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                dd("Couldn't refresh token -- this could be an intentional or unintentional logout")
                logoutUser()
            }
    
            if(loading){
                setLoading(false)
            }
        },
        [authTokens?.refresh, loading, logoutUser]
    )

    let serverURL = Config.serverURL

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        // Every four minutes, if the user is still logged in with valid authTokens in browser storage,
        // update those tokens.
        // Because the tokens have a limited lifespan, this prevents a situation where the user 
        // is logged in, tries to do something, and ends up getting logged out.
        // a more sophisticated version would check if the user is ACTIVE, and only refresh the tokens if that is
        // the case, one during whatever the interval is.
        // However, the current lifespan of an access token is a day, so this scenario is still not super likely.
        let interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

        // we have to clear the interval after calling it so it only runs once
        // otherwise we'll end up with an incerasing number of intervals running in parallell

    }, [authTokens, loading, updateToken])

    let getSettings = async() => {
        //dd(time)

        let response = await fetch(serverURL + 'getSettings/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
/*             body: JSON.stringify({
                'dateString': time.dateString,
                //'dayInMilliseconds': dayInMilliseconds()
            }) */
        })

        let data = await response.json()
        if (response.status === 200){
            setSettings(data)
        } else if (response.status === 401){
            alert("You are not authorized to read this user's settings")
            //setBody(props.data.body)
        } else if (response.status === 404){
            alert("The user you are trying to view could not be found.")
            //setBody(props.data.body)
        }
    }

    // 'Export' functions/variables to the component which will wrap other components, thus sharing its context
    let contextData = {
        // Variables
        user: user,
        authTokens:authTokens,
        serverURL: serverURL,
        loginAttempt: loginAttempt,
        settings: settings,
        
        // Functions:
        setSettings: setSettings,
        clearLoginAttempt: clearLoginAttempt,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        getSettings: getSettings
    
    }

    // Pass contextData into the value of AuthContext.Provider so that it can be used
    return (
        <AuthContext.Provider value = {contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}