import React from 'react'
import Todo from './components/Todo'
import './App.css'

function App (props) {
  const taskList = props.tasks.map((task) => {
    console.log(task)
  })

  console.log(taskList)
  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <form>
        <h2 className='label-wrapper'>
          <label htmlFor='new-todo-input' className='label__lg'>
            What needs to be done?
          </label>
        </h2>
        <input
          type='text'
          id='new-todo-input'
          className='input input__lg'
          name='text'
          autoComplete='off'
        />
        <button type='submit' className='btn btn__primary btn__lg'>
          Add
        </button>
      </form>
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

        <Todo name='Eat' completed id='todo-0' />
        <Todo name='Sleep' completed={false} id='todo-1' />
        <Todo name='Repeat' completed={false} id='todo-2' />

      </ul>
    </div>
  )
}

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
