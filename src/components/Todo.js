import React, { useContext, useState } from 'react'
import ThemeContext from '../context/ThemeContext'

// todo component accepting props parameter for name
export default function Todo (props) {
  // editing state hook
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  function handleChange (e) {
    setNewName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const theme_ = useContext(ThemeContext)

  const invertBackground = theme_.changeTheme['backgroundColor'] === "white" ? "black" : "white"
  const invertText = theme_.changeTheme['color'] === "white" ? "black" : "white"

  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className='todo-text'
          type='text'
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className='btn-group'>
        <button type='button' className='btn todo-cancel' onClick={() => setEditing(false)}>
          Cancel
          <span className='visually-hidden'>renaming {props.name}</span>
        </button>
        <button type='submit' style={{backgroundColor: invertBackground, color: invertText}} className='btn btn__primary todo-edit'>
          Save
          <span className='visually-hidden'>new name for {props.name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className='todo-label' htmlFor={props.id}>
          <div data-testid="name-todo">{props.name}</div>
        </label>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn' onClick={() => setEditing(true)}>
            Edit <span className='visually-hidden'>{props.name}</span>
        </button>
        <button
          type='button'
          className='btn btn__danger'
          onClick={() => props.deleteTask(props.id)}
        >
            Delete <span className='visually-hidden'>{props.name}</span>
        </button>
      </div>
    </div>
  )

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>
}
