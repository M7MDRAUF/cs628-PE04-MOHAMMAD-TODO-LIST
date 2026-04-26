export default function TodoItem({ todo, onDeleteTask }) {
  return (
    <li className="todo-item">
      <span className="todo-title">{todo.title}</span>
      <button
        aria-label={`Delete task ${todo.title}`}
        className="delete-button"
        type="button"
        onClick={() => onDeleteTask(todo.id)}
      >
        Delete
      </button>
    </li>
  )
}