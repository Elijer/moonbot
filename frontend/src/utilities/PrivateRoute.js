import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

// This component is a wrapper for route that is being extended
// To make sure that the user is authenticated in order to view this route
// And this can continue to be modified to show different things depending on the user

//...rest is a spread operator that can take all the parameters, or props maybe? That the <Route> tag normally gets,
// like route, path, component, etc.=


// This PrivateRoute component courtesy of Dennis Ivy
// He shared this custom extension of the Route component in the following video:
// "Authentication & Refreshing Tokens Implementation" https://www.youtube.com/watch?v=xjMP0hspNLE
// He shared the code in a public github repository here: https://github.com/divanov11/refresh-token-interval
const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest} >

            {!user ? <Redirect to = "/login/" /> : children}

        </Route>
    )
}

export default PrivateRoute