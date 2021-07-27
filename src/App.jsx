import React, { useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList.jsx";

const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([
        {'id': 1, 'task': 'Tarea', 'completed': false},
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [... todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "") return;
        setTodos((prevTodos) => {
            return [... prevTodos, {id: uuidv4(), task, completed: false}]
        })
        todoTaskRef.current.value = null;
    };

    const handleTodoDel = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return(
        <React.Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type='text' placeholder='New Task' />
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleTodoDel}>-</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</div>
        </ React.Fragment>
    )
}