import React, { useState, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Error from './components/Error'

import ThemeContext from './context/ThemeContext'
import AppTheme from './Colors'

function App (props) {

  const theme = useContext(ThemeContext)
  const [themeState, setThemeState] = useState(theme)
  const currentTheme = AppTheme[themeState]
  const styles = {
    backgroundColor: `${currentTheme.backgroundColor}`,
    color: `${currentTheme.textColor}`
  }

  function handleTheme () {
    setThemeState(themeState === "light" ? "dark" : "light")
  }
  
  return (
    <ThemeContext.Provider value={themeState}>
      <div className='todoapp stack-large' style={styles}>
        <Navbar themeState={themeState} handleTheme={handleTheme}/>
        <Switch>
          <Route path='/' component={ Home } exact />
          <Route path='/about' component = { About } />
          <Route component={ Error } />
        </Switch>
      </div>
    </ThemeContext.Provider>
  )
}

export default App