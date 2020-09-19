import React from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import './App.css'

function App (props) {

  // the tasklist running through loop and return the component Todo
  const taskList = props.tasks.map((task) => {
    return <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
    />
  })

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>

      <Form />
      
      <div className='filters btn-group stack-exception'>
        <button type='button' className='btn toggle-btn' aria-pressed='true'>
          <span className='visually-hidden'>Show </span>
          <span>all</span>
          <span className='visually-hidden'> tasks</span>
        </button>
        <button type='button' className='btn toggle-btn' aria-pressed='false'>
          <span className='visually-hidden'>Show </span>
          <span>Active</span>
          <span className='visually-hidden'> tasks</span>
        </button>
        <button type='button' className='btn toggle-btn' aria-pressed='false'>
          <span className='visually-hidden'>Show </span>
          <span>Completed</span>
          <span className='visually-hidden'> tasks</span>
        </button>
      </div>
      <h2 id='list-heading'>
        3 tasks remaining
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
