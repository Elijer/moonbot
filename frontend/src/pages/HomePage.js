import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Posts } from '../components/Posts'
import { useParams } from 'react-router-dom'

const HomePage = () => {

    let { user } = useContext(AuthContext)
    let { page } = useParams()

    return (
        <div>
            
        </div>
    )
}

export default HomePage
