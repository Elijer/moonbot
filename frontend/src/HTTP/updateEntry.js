import dd from '../utilities/Debugger'

//export let updateEntryHTTP = async(someData, dateString, userID, serverURL, access) => {
export let updateEntryHTTP = async(someData, options) => {

    dd("initiate http request to update data")

    let response = await fetch(options.serverURL + 'updateEntry/', {
        method: 'POST',
        headers:  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(options.access)
        },
        body: JSON.stringify({
            ...someData,
            'creator': options.userID,
            'dateString': options.dateString,
        })
    })

    let data = await response.json()
    if (response.status === 201){
        dd(data)
    } else if (response.status === 401){
        alert("You are not authorized to update this entry")
        //setBody(props.data.body)
    } else if (response.status === 404){
        alert("The entry you are trying to edit could not be found.")
        //setBody(props.data.body)
    }
}