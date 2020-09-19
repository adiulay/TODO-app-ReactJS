import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import './App.css'
import FilterButton from './components/FilterButton'
import { nanoid } from 'nanoid'

function App (props) {
  // state
  const [tasks, setTasks] = useState(props.tasks)

  // function that sets a state
  function addTask (name) {
    const newTask = {
      id: 'id-' + nanoid(),
      name: name,
      completed: false
    }
    setTasks([...tasks, newTask])
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

  // the tasklist running through loop and return the component Todo
  const taskList = tasks.map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ))

  // number of tasks will be shown on app
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className='filters btn-group stack-exception'>
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id='list-heading'>
        {headingText}
      </h2>
      <ul
        role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >

        {taskList}

      </ul>
    </div>
  )
}

// <Todo name='Eat' completed={true} id='todo-0' />
// <Todo name='Sleep' completed={false} id='todo-1' />
// <Todo name='Repeat' completed={false} id='todo-2' />
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App
