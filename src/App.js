import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilters from './components/TodoFilters';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [datas, setDatas] = useState([]);
  const [filterToDos, setfilterToDos] = useState(datas);
  useEffect(()=>{
    fetch('http://localhost:3001/todo')
    .then(data=> data.json())
    .then((todos)=>{
      setDatas(todos);
      setfilterToDos(todos);
    })
  },[])
  
  const addTodo = (data) =>{
    fetch('http://localhost:3001/todo', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
    setDatas(prevState => [...prevState, data])
  }

  const delTodo = (todoId) => {
    fetch(`http://localhost:3001/todo/${todoId}`,{
      method : "DELETE"
    })
    setDatas(prevState => {
      return prevState.filter(todo => {
        return todo.id !== todoId
      })
    })
  }

  const updateTodo = (todo) => {
    console.log(todo.id)
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(todo)
    })
    setDatas(prevState => {
      return prevState.map(t => {
        if (t.id === todo.id){
          return todo;
        }
        return t;
      })
    })
  }

  const remainingCount = datas.filter(data => !data.completed).length

  const checkAll = () =>{
    datas.forEach(data => {
      data.completed = true;
      updateTodo(data);
    })
    setDatas(prevState => {
      return prevState.map(t => {
        return {...t, completed:true};
      })
    })
  }

  const clearTodo = () => {
    datas.forEach(data => {
      if (data.completed){
        delTodo(data.id);
      }
    });
    setDatas(prevState => {
      return prevState.filter(t => {
        return !t.completed
      })
    })
  }

  const filterFunc = useCallback((filter) => {
    if(filter === "All"){
      setfilterToDos(datas);
    }

    if(filter === "Active"){
      setfilterToDos(datas.filter(data => !data.completed))
    }

    if(filter === "Completed"){
      setfilterToDos(datas.filter(data => data.completed))
    }

  },[datas])
  
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={filterToDos} delTodo={delTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining remainingCount={remainingCount} checkAll={checkAll}/>
        <div className="other-buttons-container">
          < TodoFilters filterFunc={filterFunc}/>
          < ClearCompletedBtn clearTodo={clearTodo}/>
        </div>
      </div>
    </div>
  );
}

export default App;
