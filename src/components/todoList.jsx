import { useState, useEffect } from "react";
import { STORAGE_KEY } from "../consts/storageKey";
import { storageService } from "../services/storageService";
import { Todo } from "./todo";
import './../App.css'

function TodoList() {
    const [todos, setTodos] = useState(storageService.loadFromStorage(STORAGE_KEY));
    const [inputValue, setInputValue] = useState("");
    const [filterMode, setFilterMode] = useState("all");

    useEffect(() => {
        storageService.saveToStorage(STORAGE_KEY, todos);
    }, [todos]);

    const addTodo = () => {
        if (!inputValue.trim()) return;
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: inputValue.trim(),
                completed: false,
            },
        ]);
        setInputValue("");
    };

    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleEdit = (id, value) => {
        if (!value.trim()) return;
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, title: value.trim() } : todo
            )
        );
    };

    const handleDeleteAll = () => {
        setTodos([]);
    };

    const handleDeleteAllDones = () => {
        setTodos(todos.filter((todo) => todo.completed === false));
    }

    const getTodosByFilterMode = () => {
        switch(filterMode) {
            case 'all':
                return todos;
            case 'completed':
                return todos.filter((todo) => todo.completed)
            case 'active':
                return todos.filter((todo) => !todo.completed);
        }
    }

    return (
        <div className="interface">
            <h1>Todo list</h1>
            <button className="filter-mode" onClick={() => setFilterMode('all')}>Show All</button>
            <button className="filter-mode" onClick={() => setFilterMode('completed')}>Show Completed</button>
            <button className="filter-mode" onClick={() => setFilterMode('active')}>Show Not Completed</button>
            <div className="add-section">
                <input
                    className="todo-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="todo-button" onClick={addTodo}>
                    Add
                </button>
            
            </div>
            {todos.length === 0 ? (
                <p>There is no todo</p>
            ) : (<>
                <ul className="todo-list">
                    {getTodosByFilterMode(filterMode).map((todo) => (
                        <Todo
                            {...todo}
                            onCheckboxClicked={() => toggleTodo(todo.id)}
                            onEditButtonClicked={handleEdit}
                            onDeleteButtonClicked={() => deleteTodo(todo.id)}
                            key={todo.id}  
                        />
                    ))}
                </ul>
                <button className="delete-all" onClick={handleDeleteAll}>Delete all</button>
                <button className="delete-all-done" onClick={handleDeleteAllDones}>Delete all dones</button>
            </>)}
        </div>
    );
}

export default TodoList;
