import { useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [taskName, setTaskName] = useState('')
  const [todos, setTodos] = useState([])
  const [nextId, setNextId] = useState(1)
  const [message, setMessage] = useState('Add your first task to begin organizing your work.')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTaskName = taskName.trim()

    if (!trimmedTaskName) {
      setMessage('Please enter a task description before adding a task.')
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: nextId,
        title: trimmedTaskName,
      },
    ])
    setNextId((currentId) => currentId + 1)
    setTaskName('')
    setMessage(`Added task: ${trimmedTaskName}`)
  }

  function handleDeleteTask(taskId) {
    const removedTask = todos.find((todo) => todo.id === taskId)
    const updatedTodos = todos.filter((todo) => todo.id !== taskId)

    setTodos(updatedTodos)
    setMessage(
      removedTask ? `Deleted task: ${removedTask.title}` : 'The selected task was already removed.',
    )
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <div className="hero-copy">
          <p className="eyebrow">CS628 PE04</p>
          <h1>React ToDo List</h1>
          <p className="lead">
            Add tasks, review them instantly, and remove them when they are complete.
          </p>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="task-input">
            ToDo description
          </label>
          <div className="task-entry-row">
            <input
              id="task-input"
              className="task-input"
              type="text"
              placeholder="Enter a task"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
            <button className="primary-button" type="submit">
              Add Task
            </button>
          </div>
        </form>

        <p className="status-message" role="status" aria-live="polite">
          {message}
        </p>

        <TodoList todos={todos} onDeleteTask={handleDeleteTask} />
      </section>
    </main>
  )
}

export default App
