import React, { useContext, useEffect, useState, useCallback } from 'react'
import AuthContext from '../context/AuthContext'
//import Config from '../context/Config'
import { Post } from './Post'
import dd from '../utilities/Debugger'

export function Posts(props){

  /* --- PROPS ----- /
  props.onlyPostsByUser = if true, only posts by user are shown. Otherwise, all posts are shown (if props.list is true, anyways)
  props.form = if true, the new post form will be returned
  props.list = if true, the list of all posts will be returned by default
  props.byUser = optional - passes in a userID to dispaly posts only by a specific user
  props.postsByFollowedAccounts = true or false value that will then rely on the user.id to display only posts by followed accounts
  / --------------- */

  let { serverURL, user, authTokens } = useContext(AuthContext)

  const [state, setState] = useState({
    formBody: "",
    page: parseInt(props.page) ? props.page : 1,
    end: "",
    posts: [],
    data: false
  })

  function handleInput(event){
    event.preventDefault();
    setState({
        ...state,
        formBody: event.target.value
    })
    dd("test")
  }
    
  function handleSubmit(e){
    e.preventDefault()
    let body = state.formBody

    fetch(serverURL + 'newPost/', {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        id: user.id,
        body: body
      })
    })
    .then(response => response.json())
    .then((result) => {
        getPosts(1)
    })
  }

  let getPosts = async(page) => {

    let currentPage = page ? page : state.page

    // Default Mode
    let mode = "default"
    let id = user.id

    // Followed Accounts Mode
    if (props.postsByFollowedAccounts){
      mode = "postsByFollowedAccounts"
      id = user.id
    }

    // posts by User Mode
    if (props.byUser){
      mode = "byUser"
      id = props.byUser
    }

    let response = await fetch(serverURL + 'getPosts/', {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'id': id,
        'mode': mode,
        'page': currentPage
      })
    })

    let data = await response.json()
    dd(data)
    if (response.status === 200){
      setState({
        ...state,
        posts: data[0],
        page: currentPage,
        end: data[1].pages,
        formBody: "",
        data: true
      })
    } else {
      setState({
        ...state,
        //posts: [result].concat(state.posts), // result @ beginning of array, maintaining order realm
        formBody: ""
      })
      dd("error getting post data", response)
    }

    return true;
  }

  // This is wrapper for the async getPosts function, allowing it to be passed into useEffect
  const getPostsCallback = useCallback(getPosts, [])

  useEffect(() => {
    let mounted = false
    mounted = getPostsCallback()

    return () => {
      setState({});
    }

  }, [getPostsCallback])


  let pageBack = () => {
    if (state.page > 1){ // Since the first page is one, it has to be more than one to go back, or will be out of range
      setState({
        ...state,
        page: state.page--
      })
      getPosts()
      //pushURL()
    }
  }

  let pageForward = () => { // So I could set the limit for this if I could get the page range, but I can't yet "fit" the page range in the response. I appear to be returning a list full of dictionaries, and I'm thinking something like returning a tuple with [0] a list full of dictionaires and [1] a dictionary with extra info, like the page range attributes "first" and "last". I think i can encode that into json just like anything else,
    if (state.page < state.end){
      setState({
        ...state,
        page: state.page++
      })
      getPosts()
      //pushURL()
    }
  }

/*   let pushURL = () => {
    var base_url = window.location.origin;
    const newURL = `${base_url}/page-${state.page}`
    window.history.pushState({'page': state.page}, '', newURL )
  } */

  if (!state.data){
    return(
      <div className = "stats"> No data yet </div>
    )
  } else {
    return (
      <div>
        {props.form &&
          <div id="new-post">
              {/* <h3> Create New Post</h3> */}
              <form onSubmit={handleSubmit} className = "new-post-form">
                  <textarea onChange = {handleInput} name = "body" value = {state.formBody} className="input-form" placeholder="Create new post..."></textarea>
                  <input type="submit" className="form-button" value = "Create Post" />
              </form>
          </div>
        }
  
        {props.list &&
          <div id = "show-posts">
  
  
            { state.end > 1 &&
              <div className = "page-nav">
                <button onClick = {pageBack} className={"page-nav-button back " + (state.page != 1 ? "" : "inactive-button")}> Back </button>
                <button onClick = {pageForward} className={"page-nav-button " + (state.page != state.end ? "" : "inactive-button")}> Next </button>
                <span className = "post-count"> Posts on Page: {state.posts.length} </span> 
                <span className = "current-page"> Page: {state.page} / {state.end} </span>
              
              </div>
            }  
  
{/*             <div> Page {state.page} / {state.end} </div>
            <div> {state.posts.length} posts on this page </div> */}
            <div className = "posts-container">
              {state.posts.map((post) => (
                <Post key = {post.id} data = {post} />
              ))}
            </div>
          </div>
        }
  
      </div>
    )
  }
}