import React from 'react'
import { Link } from 'react-router-dom'

function Navbar (props) {

    const themeTogglerStyle = {
        cursor: "pointer"
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link to="/about">About</Link>
            &nbsp;|&nbsp;
            <button style={themeTogglerStyle} onClick={() => {props.handleTheme()}}>
                <span title = "switch theme">
                    {props.themeState === "light" ? "🌚" : "🌞"}
                </span>
            </button>
        </nav>
    )
}

export default Navbar