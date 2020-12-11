import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { BsBoxArrowInDown } from 'react-icons/bs'

import TodoForm from './TodoForm'


export default function Todo({ todos, completeTodo, removeTodo, fadeTodo, editTodo, date}) {
    //add Modal for update
    //add Drop down
    const [showInfo, setShowInfo] = useState('')
    const [edit, setEdit] = useState({})

    const amPm = date.getHours() < 12 ? 'am' : 'pm'
   
    const submitEdit = value => {
        editTodo(edit.id, value)
        setEdit({})
    }
   
    return (
        todos.map(todo => (
        <div 
            key={todo.id} 
            className={
                `todo-row 
                ${todo.completed && 'complete'} 
                ${todo.remove && "remove" }`
            }
        style={{border: edit.id === todo.id ? 'none' : '1px solid rgba(221,221,221, .9)'}}
        >

        {edit.id === todo.id  && 
                <TodoForm 
                    edit={edit} 
                    onSubmit={submitEdit} 
                    todos={todos} 
                    date={date}
                />
        }

        <div className="todo-row-main">
        <div className="todo-text">
            <p>{todo.text}</p>
            <span className="info-icon">
                {/* <BsBoxArrowInDown onClick={() => setShowInfo(todo)}/> */}
            </span>
        </div>
            <p className="todo-date">{todo.date}{amPm}</p>
        </div>
            <div className="icons" >
                <IoMdCheckmarkCircleOutline
                    className="completed-icon"    
                    onClick={() => completeTodo(todo.id)}
                    />
                <RiCloseCircleLine
                    className={`delete-icon`}
                    onClick={() => {
                        fadeTodo(todo.id)
                        removeTodo(todo.id)
                    }}
                />
                <TiEdit
                    className={`${!todo.completed ? 'edit-icon': 'disabled'}`}
                    onClick={() => !todo.completed && setEdit({id: todo.id})}
                />
            </div>
        </div>
    )))
}
