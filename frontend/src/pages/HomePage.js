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

            <div id = "title">
                <h1> 🌙 Katie's Period Tracker ✨ </h1>
            </div>

            <div id = "date">
                <div id = "day"></div>
                <div id = "time"></div>
            </div>

            <div id = "form">
                <div className = "section" id = "sleepWake">
                    <h3> 🛌 Bed </h3>
                    <span className = "timeInputContainer">
                        <input id = "nightInput" className = "timeInput" maxLength = "5"></input>
                    </span>
                    , woke
                    <span className = "timeInputContainer">
                        <input id = "morningInput" className = "timeInput"></input>
                    </span>.
                </div>

                <div className = "section" id = "outside">
                    <h3> 🦉 Today I went outside:</h3>
                    <button id = "outsideNo" className = "btn"> No </button>
                    <button id = "outsideYes" className = "btn"> Yes </button>
                </div>
                
                <div className = "section">
                    <h3> 💧 And cried this many times:</h3>
                    <button id = "lessCry" className = "btn"> - </button>
                    <button id = "cryNumber"> 0 </button>
                    <button id = "moreCry" className = "btn"> + </button>
                </div>
                
                <div className = "section">
                    <h3 id = "energyHeader"> ⚡️ This <span id = "dayRegion"></span>, I have this much energy:</h3>
                    <p id = "energyNote"></p>
                    <div id = "energyOptions">
                    <button className = "btn" id = "little">Little</button>
                    <button className = "btn" id = "some">Some</button>
                    <button className = "btn" id = "lots">Lots</button>
                    </div>
                </div>
                
                <div className = "section">
                    <h3>🌙 Took this birth control pill:</h3>
                    <div className = "grid-container" id = "bcGrid">
                    </div>
                </div>
                </div>
        </div>
    )
}

export default HomePage
