import React, { useState, useEffect, useRef } from 'react';


export default function TodoForm({onSubmit, todos, edit, date}) {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')

    const dateHour = date.getHours() < 12 ? date.getHours() : date.getHours() - 12
    const dateMinutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const todoDateAdded = ` ${dateHour}:${dateMinutes}`


    const focus = useRef(null)

    useEffect(() => {
        focus.current.focus()
    },[])

    console.log(todos)
    const handleSubmit = event => {
        event.preventDefault()
        if(input.length> 0) {
            onSubmit({
                id: todos.length > 0 ? todos[0].id + 1 : 1,
                text: input,
                completed: false,
                remove: false,
                appear: true,
                date: todoDateAdded
            })
            setInput('')
            setError('')
        } else {
            setError('Too Short')
        }
        setInput('')
    }
    
    return (
        <form className={`todo-form ${edit && 'edit'}`} onSubmit={handleSubmit} >
            <input 
                className={`todo-input ${edit && 'edit'}`} 
                type="text" 
                placeholder={!edit ? 'Add a Todo' : edit.value}
                onChange={(event) => setInput(event.target.value)}
                value={input} name="text"
                ref={focus}
            />
            <button className={`todo-button ${edit && 'edit'}`}  >{!edit ? 'Add Todo' : 'Update'}</button>
            {error && <span className="todo-error">{error}</span>}
        </form>
    )
}