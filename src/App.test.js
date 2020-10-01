import React from 'react'
import { render, screen, cleanup, getNodeText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'
import App from './App'
import Form from './components/Form'
import Todo from './components/Todo'

test('App snapshot test', () => {
  const component = renderer.create(<App tasks={[]} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
});

afterEach(() => {
  cleanup()
})

describe('<App />', () => {
  it('renders App component', () => {
    const { getByText } = render(<App tasks={[]} />)
    const linkElement = getByText('What needs to be done?')
    expect(linkElement).toBeInTheDocument()
  })

  it("should display todo in App", () => {
    const todo_list = [
      { id: 'todo-1', name: 'eat', completed: true },
      { id: 'todo-2', name: 'sleep', completed: true },
      { id: 'todo-3', name: 'live', completed: false },
      { id: 'todo-4', name: 'repeat', completed: true }
    ]
    // this one is important for me
    const container = renderer.create(<App tasks={todo_list} />)

    const container_json = container.toJSON()

    expect(container_json.children[3].children.length).toBe(4)
    
  })

  it('should display 1 active in todo', () => {
    const todo_list = [
      { id: 'todo-1', name: 'eat', completed: true },
      { id: 'todo-2', name: 'sleep', completed: true },
      { id: 'todo-3', name: 'live', completed: false },
      { id: 'todo-4', name: 'repeat', completed: true }
    ]

    render(<App tasks={todo_list} />)

    userEvent.click(screen.getByText('Active'))

    expect(screen.getByText('1 task remaining')).toBeTruthy()
    
  })
  
})


describe('<Todo />', () => {
  it('renders Todo component', () => {
    const { getByText } = render(<Todo />)
    const linkElement = getByText('Edit')
    expect(linkElement).toBeInTheDocument()
  })

  it('checks edit is clicked', () => {
    const newName = 'Do Homework'

    render(<Todo name={newName}/>)

    screen.getByText('Edit')
    screen.getByText('Delete')

    // removing this failes the test
    userEvent.click(screen.getByText('Edit'))

    expect(screen.getByText(`New name for ${newName}`)).toBeInTheDocument()

  })
});



