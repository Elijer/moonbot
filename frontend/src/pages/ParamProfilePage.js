import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
import dd from '../utilities/Debugger'

// Needed for dynamic URL paramaters/paramaterization
import { useParams } from 'react-router-dom'

const ParamProfilePage = () => {

    // GET AUTH CONTEXT VARS
    let {authTokens, user, serverURL} = useContext(AuthContext)

    const { handle } = useParams()

    // STATE
    const [state, setState] = useState({
        visitedUser: {
            email: "loading",
            username: "loading",
            following: [],
            followers: [],
            id: handle,
        },
        visit: {
            other: "",
            following: ""
        }
      })
    // dd(user)

    // GET URL PARAMETER WITH VISITED USER HANDLE

    useEffect(() => {

        (async () => {
            
            // Get Data
            let response = await fetch(serverURL + 'getProfile/', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                'id': handle
            })
            })
            
            // Save the data of whose page we're visiting
            let data = await response.json()
            let visit = {}

            if (response.status == 200){

                visit.other = (data.id != user.id) ? true : false;

                dd("Current user: ", user.username)
                dd("Visiting user: ", data.username)

                dd(data)

                if (visit.other){
                    if (data.followers.includes(user.id)){
                        dd("following")
                        visit.following = true
                    } else {
                        dd("not following")
                        visit.following = false
                    }
                } else {
                    dd("can't follow your own page")
                }

                // First add all data about this profile to state
                setState({
                ...state,
                visitedUser: data,
                visit: visit
                })

            } else {
            dd("error getting post data", response)
            }

        })()

        // Return is the unmount event -- we're gonna set state to 0 on unmount cause React
        // Seems to want us to
        return () => {
            setState({})
        }
    }, [])

    let follow = async (follow) => {
        // Get Data
            let response = await fetch(serverURL + 'follow/', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    'id': user.id,
                    'targetUserID': handle,
                    'follow': follow
                })
            })
            
            // Save the data of whose page we're visiting
            let data = await response.json()
            if (response.status == 201){
                dd(data.nowFollowing)
                setState({
                    ...state,
                    visitedUser: {
                        ...state.visitedUser,
                        followers:
                        data.nowFollowing ?
                            state.visitedUser.followers.concat(user.id)
                            :
                            state.visitedUser.followers.filter((item) => item !== user.id)
                    },
                    visit: {
                        ...state.visit,
                        following: data.nowFollowing
                    }
                })
            } else {
                dd("error: http request to follow didn't work.")
            }


    }


    
    if (handle != user.id){
        return (
            <div id = "profile-page" className = "push page-title">
                <h1 className = "page-title"> Viewing Profile {state.visitedUser.username}</h1>
                <div className = "stats"> Followers: {state.visitedUser.followers.length} </div>
                <div className = "stats"> Following: {state.visitedUser.following.length} </div>
                { state.visit.following ? (
                    <button onClick = {(e) => follow(false)} className = "follow-unfollow-btn" > Unfollow </button>
                ) : (
                    <button onClick = {(e) => follow(true)} className = "follow-unfollow-btn" > Follow </button>
                )}
                <Posts list = "true" byUser = {state.visitedUser.id} />
            </div>
        )
    } else {
        return (
            <div id = "profile-page" className = "push">
                <h1 className = "page-title"> Viewing Your Own Profile ({user.uppercaseUsername})</h1>
                <div className = "stats" > Followers: {state.visitedUser.followers.length} </div>
                <div className = "stats" > Following: {state.visitedUser.following.length} </div>
                <Posts list = "true" byUser = {user.id} />
            </div>
        )
    }
}

export default ParamProfilePage