import React, { Fragment as F, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import dd from '../utilities/Debugger'
import AuthContext from '../context/AuthContext'
import spacetime from 'spacetime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'


export function Post(props){

    let { user, serverURL, authTokens } = useContext(AuthContext)

    let [editing, setEditing] = useState(false)

    let [body, setBody] = useState(props.data.body)
    let [liked, setLiked] = useState(props.data.liked)
    let [likes, setLikes] = useState(props.data.likes)

    let [timeOfCreation] = useState(() => {
        let time = spacetime(props.data.timestamp)
        return time.time()
    })

    let [dateOfCreation] = useState(() => {
        let time = spacetime(props.data.timestamp)
        return `${time.format('month-short')}  ${time.format('date')}`
    })

    let handleEditButton = () => {
        setEditing(!editing)
        dd(editing)
    }

    let handleEditInput = (e) => {
        setBody(e.target.value)
    }

    let handleEditSubmit = async (e) => {
        e.preventDefault()
        setEditing(!editing)
        dd(e.target.value)

        dd(props.data.id)
        let response = await fetch(serverURL + 'editPost/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
              'postID': props.data.id,
              'userID': user.id,
              'edits': body
            })
        })

        let data = await response.json()
        if (data.status === 200){
        } else if (data.status === 41){
            alert("You are not authorized to edit this post")
            setBody(props.data.body)
        } else if (data.status === 404){
            alert("The post you are trying to edit could not be found.")
            setBody(props.data.body)
        }
    }

    let like = async() => {
        //liked = setLiked(!liked)

        let response = await fetch(serverURL + 'likePost/', {
            method: 'POST',
            headers:  {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
              'postID': props.data.id,
              'liked': !liked
            })
        })

        let data = await response.json()
        if (data.status === 201){
            setLiked(data.liked)
            setLikes(data.likes)
        } else {
            dd("There was a problem adding like to database")
        }
    }

    return (
        <div className = "post">



            <div className = "column-1">
                <div className = "post-details">
                    <Link to={`/profile/${props.data.creatorID}`} className = "post-details creator" >
                        {props.data.creator}
                    </Link>
                </div>


                {/* Rest of post information, rendered the same regardless of editing state/priveleges */}
                <div className = "post-details date"> {dateOfCreation} </div>
                <div className = "post-details date"> {timeOfCreation} </div>
                
                <div className = "post-details like-component">
                    
                    <FontAwesomeIcon icon={faHeart} onClick = {like}
                    className = { liked ? "liked" : "unliked" }/>

                    <span className = "like-number"> {likes} </span>

                </div>

        
            </div>




            <div className = "column-2">
                { props.data.creatorID !== user.id &&
                    <div className = "post-body">{body}</div>
                }

                { props.data.creatorID === user.id && !editing &&
                    // Editing priveleges -- press edit button edit
                    <F>
                        <div className = "post-body">{body}</div>
                        <button onClick={handleEditButton} className = "edit-start">
                            <FontAwesomeIcon icon={faPencil} />
                            <span> Edit </span>
                        </button>
                    </F>
                }

                { props.data.creatorID === user.id && editing &&
                    // Editing priveleges -- currently editing
                    <F>
                        <form className = "edit-form" onSubmit={handleEditSubmit}>
                            <textarea onChange = {handleEditInput} name = "body" value = {body} placeholder = {body} className = "edit-area"></textarea>
                            
                            <div className = "edit-end">
                                <FontAwesomeIcon icon={faCheck} />
                                <input type="submit" value = "Done" className = "edit-done-btn" />
                            </div>
                        </form>
                    </F>
                }
            </div>



        </div>
    )
}