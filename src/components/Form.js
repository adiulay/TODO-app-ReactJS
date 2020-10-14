import React, { useState, useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

function Form (props) {
  // state name
  const [name, setName] = useState('')

  // Form when clicked send adds it to addTask from App component
  function handleSubmit (e) {
    e.preventDefault()
    props.addTask(name)
    setName('')
  }

  // sets state with the new string inputted by user
  function handleChange (e) {
    setName(e.target.value)
  }

  const changeTheme = useContext(ThemeContext)

  const invertBackground = changeTheme['backgroundColor'] === "white" ? "black" : "white"
  const invertText = changeTheme['color'] === "white" ? "black" : "white"

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='label-wrapper'>
        <label htmlFor='new-todo-input' className='label__lg'>
            What needs to be done?
        </label>
      </h2>
      <input
        style={{backgroundColor: invertText, color: invertBackground, borderColor: invertBackground}}
        type='text'
        id='new-todo-input'
        placeholder='to do'
        className='input input__lg'
        name='text'
        autoComplete='off'
        value={name}
        onChange={handleChange}
      />
      <button style={{backgroundColor: invertBackground, color: invertText}} type='submit' data-testid='addRequest' className='btn btn__primary btn__lg'>
          Add
      </button>
      <button style={{backgroundColor: invertBackground, color: invertText}} onClick={props.clearTasks} className='btn btn__primary btn__lg'>
          Clear All Tasks
      </button>
    </form>
    
  )
}

export default Form
