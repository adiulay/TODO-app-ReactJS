import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
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


  it('adds task to the screen', () => {
    const { getAllByText } = render(<App tasks={[]} />)
    const todo = 'Shower'
    // screen.getByTestId('list-heading')
    screen.getByText('0 tasks remaining')

    userEvent.type(screen.getByRole('textbox'), 'Shower')
    userEvent.click(screen.getByTestId('addRequest'))

    expect((getAllByText(todo)[0])).toBeInTheDocument()

  });
  
})

describe('<Form />', () => {
  it('renders Form component', () => {
    const { getByText } = render(<Form />)
    const linkElement = getByText('Add')
    expect(linkElement).toBeInTheDocument()
  })

  it('inputs the right value before adding', () => {
    
    const testMessage = 'Do Homework'

    const { getByRole } = render(<Form />)

    userEvent.type(getByRole('textbox'), testMessage)

    expect(screen.getByRole('textbox')).toHaveValue('Do Homework')

  });
  
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



