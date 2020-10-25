import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'

function Navbar (props) {

    const themeTogglerStyle = {
        cursor: "pointer"
    }

    const theme_ = useContext(ThemeContext)

    return (
        <nav>
            <Link to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link to="/about">About</Link>
            &nbsp;|&nbsp;
            <Link to="/API">API</Link>
            &nbsp;|&nbsp;
            <button style={themeTogglerStyle} onClick={() => {theme_.handleTheme()}}>
                <span title = "switch theme">
                    {props.themeState === "light" ? "🌚" : "🌞"}
                </span>
            </button>
        </nav>
    )
}

export default Navbar