import { useState, useEffect } from 'react'
import './App.css'
import {TodoProvider, useTodo} from './context/todoContext.js'
import TodoItem from './components/TodoItem.jsx'
import TodoForm from './components/TodoForm.jsx'

function App() {

const [todos, setTodos] = useState([])

function addTodo(todo){
setTodos((prev) => [{id: Date.now(), ...todo }, ...prev])
}

function updateTodo(id,todo){
setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo: prevTodo)))
}

function deleteTodo(id){
setTodos((prev) => prev.filter((todo) => todo.id !== id))
}

function toggleComplete(id){setTodos((prev) =>
prev.map((prevTodo) =>
prevTodo.id === id ? { ...prevTodo,
completed: !prevTodo.completed }: prevTodo))

}

//Context ends

//Local storage

useEffect(() => {
//get item
const todos = JSON.parse(localStorage.getItem("todos"))

if (todos && todos.length > 0){setTodos(todos)}
}, [])

//set item

useEffect(() => {
localStorage.setItem("todos", JSON.stringify(todos))

if (todos && todos.length > 0){
setTodos(todos)
}

}, [todos])

return (
<TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
  <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <h1 className="text-xl text-center font-bold">
                    Ansh,Kiran,Takle,Mutthal Kya kar rahe ho
                    </h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
  <TodoForm />
</div>
  <div className="flex flex-wrap gap-y-3">
    {/*Loop and Add TodoItem here */}
    {
  todos.map((todo) => (
  <div key=
    {todo.id}
    className="w-full"
    >
    <TodoItem todo={todo} />
  </div>
  ))
  }
</div>
</div>
</div>
</TodoProvider>
)
}

export default App