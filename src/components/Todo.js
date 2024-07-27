import React, { useState } from 'react'

const Todo = ({todo, delTodo, updateTodo}) => { 
  const [isEdit, setisEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const updateTodoHandler = (e) =>{
    e.preventDefault();
    let data = {
        id : todo.id,
        title,
        completed: todo.completed
    }
    // console.log(data);
    updateTodo(data);
    setisEdit(false);
  }

  const handleCheckBox = () => {
    let data = {
      id : todo.id,
      title,
      completed : !todo.completed
    }
    updateTodo(data);
  }
  return (
    <div>
      <li className="todo-item-container" key={todo.id}>
            <div className="todo-item">
              <input type="checkbox" checked={todo.completed} onChange={handleCheckBox}/>
              {!isEdit && <span onDoubleClick={()=> setisEdit(true)} className={`todo-item-label
              ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </span>}
       
              {isEdit && 
              <form onSubmit={updateTodoHandler}> 
                <input type="text" className="todo-item-input" value={title} onChange={(e)=> setTitle(e.target.value)}/>
              </form>}

            </div>
            <button className="x-button" onClick= {() => delTodo(todo.id)}>
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
    </div>
  )
}

export default Todo
