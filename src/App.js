import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import './App.css'
import FilterButton from './components/FilterButton'
import { nanoid } from 'nanoid'

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App (props) {
  // statehook
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  // function that sets a state
  function addTask (name) {
    const newTask = {
      id: 'id-' + nanoid(),
      name: name,
      completed: false
    }

    if (name !== '') {
      setTasks([...tasks, newTask])
    }
  }

  // checkmark toggle placed in Todo component
  function toggleTaskCompleted (id) {
    const updatedTasks = tasks.map(task => {
      // checks if ID is same as the one being edited
      if (id === task.id) {
        // !task.completed reverses the boolean 🤯
        // spread syntax is involved (...task)
        return { ...task, completed: !task.completed }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  // task delete function for Todo component
  function deleteTask (id) {
    // used filter where we remove the matched id from list
    const remainingTasks = tasks.filter(task => id !== task.id)
    // overrides the array with new array
    setTasks(remainingTasks)
  }

  // editing function for Todo component
  function editTask (id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }

      return task
    })

    setTasks(editedTaskList)
  }

  // the tasklist running through loop and return the component Todo
  const taskList = tasks
    .filter(task => FILTER_MAP[filter](task))
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  // number of tasks will be shown on app
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className='todoapp stack-large'>

      <Form addTask={addTask} />

      <div className='filters btn-group stack-exception'>
        {filterList}
      </div>
      <h2 id='list-heading'>
        {headingText}
      </h2>
      <ul
        className='todo-list stack-large stack-exception'
      >

        {taskList}

      </ul>
    </div>
  )
}

export default App

// role='list'
// className='todo-list stack-large stack-exception'
// aria-labelledby='list-heading'
