import TodoItem from './TodoItem'

export default function TodoList({ todos, onDeleteTask }) {
  return (
    <section className="list-section" aria-labelledby="todo-list-heading">
      <div className="list-header">
        <h2 id="todo-list-heading">My Tasks</h2>
        <p>{todos.length} task(s)</p>
      </div>

      {todos.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one above to populate your list.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDeleteTask={onDeleteTask} />
          ))}
        </ul>
      )}
    </section>
  )
}