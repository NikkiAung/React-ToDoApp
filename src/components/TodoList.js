import React from 'react'
import Todo from './Todo'
const TodoList = ({todos, delTodo, updateTodo}) => {
  return (
    <div>
        <ul className="todo-list">
          {todos.map(todo=>(
            < Todo todo={todo} key={todo.id} delTodo={delTodo} updateTodo={updateTodo}/>
          ))}
        </ul>
    </div>
  )
}

export default TodoList
