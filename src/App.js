import React, { useState, useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import API from './components/Api'
import Navbar from './components/Navbar'
import Error from './components/Error'

import ThemeContext from './context/ThemeContext'

function App (props) {
  const theme = useContext(ThemeContext)
  const [themeState, setThemeState] = useState(theme)

  // localstorage used both use effect
  useEffect(() => {
    const currentTheme = localStorage.getItem('currentTheme')

    if (currentTheme) {
      setThemeState(currentTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentTheme', themeState)
  }, [themeState])

  // stores state of useContext
  const changeTheme = {
    backgroundColor: `${themeState === "light" ? "white" : "black"}`,
    color: `${themeState === "light" ? "black" : "white"}`,
  }

  function handleTheme () {
    setThemeState(themeState === "light" ? "dark" : "light")
  }

  // pass object on theme
  const theme_ = { changeTheme, handleTheme }
  
  return (
    <ThemeContext.Provider value={theme_}>
      <div className='todoapp stack-large' style={changeTheme}>
        <Navbar />
        <Switch>
          <Route path='/' component={ Home } exact />
          <Route path='/about' component = { About } />
          <Route path='/API' component = { API } />
          <Route component={ Error } />
        </Switch>
      </div>
    </ThemeContext.Provider>
  )
}

export default App