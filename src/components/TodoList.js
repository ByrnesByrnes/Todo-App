import React, {useState} from 'react';
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

export default function TodoList({edit}) {
    const savedTodos = JSON.parse(localStorage.getItem('todos'))
    const [todos, setTodos] = useState(savedTodos || [])
    console.log(edit, 'unde')
    localStorage.setItem('todos', JSON.stringify(todos))

    const addTodo = todo => {
        setTodos([todo,...todos])
    }   

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date()

    const editTodo = (id, value) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: value.text
                }
            }
            return todo
        })
        return setTodos(updatedTodos)
        // setTodos(prev => {prev.map(todo => todo.id === id ? value : todo)})
    }

    const completeTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        return setTodos(updatedTodos)
    }

    const removeTodo = (id) => {
        setTimeout(() => {
            const updatedTodos = todos.filter(todo => todo.id !== id && todo)
            return setTodos(updatedTodos)
        },200)
    }
    const fadeTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    remove: true
                }
            }
            return todo
        })
        return setTodos(updatedTodos)
    }

    return (
        <>  
            <div className="todo-list-title">
                <h1>Let's Plan</h1>
                <h4>{months[date.getMonth()]},{date.getDate()},{date.getFullYear()}</h4>
            </div>
            <TodoForm 
                edit={edit}
                onSubmit={addTodo} 
                todos={todos}
                date={date}
            />
            <div className="todos-container" id="todos-container">
                {todos.length < 1 ?
                <div className="todo-empty">
                    <h2>Lets add a Todo!</h2>
                </div>:
                    <TodoItem 
                        todos={todos} 
                        completeTodo={completeTodo} 
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        fadeTodo={fadeTodo}
                        date={date}                        
                    />}
            </div>
        </>

    )
}