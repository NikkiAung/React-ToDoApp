import React, { useState } from 'react'

const TodoForm = ({addTodo}) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: Math.random,
      title,
      completed: false
    }
    addTodo(data);
    setTitle('');
  }
  return (
    <div>
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
          />
        </form>
    </div>
  )
}

export default TodoForm
