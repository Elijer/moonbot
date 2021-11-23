let serverURL;

if (window.location.hostname === "localhost") {
    serverURL = "http://127.0.0.1:7000/"
} else {
    //serverURL = `${window.location.protocol}//${window.location.hostname}:7000/`
    //serverURL: `http://moonbot.me:7000/`
    serverURL = "http://http://104.131.76.82:7000/"
}

const Config = {
    serverURL: serverURL
}

export default Config