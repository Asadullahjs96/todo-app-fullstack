import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTask, setEditTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                console.log(result);
                setTodos([result.data, ...todos]); // Adding new todo at the beginning of the array
                setTask('');
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setEditTask(todo.task);
    }

    const handleUpdate = () => {
        axios.put(`http://localhost:3001/update/${editingTodo._id}`, { task: editTask })
            .then(() => {
                fetchTodos();
                setEditingTodo(null);
                setEditTask('');
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="home-container">
            <h2 className="home-title">Todo List</h2>
            <Create onAddTodo={fetchTodos} />
            <div className="todos-container">
                {
                    todos.length === 0
                        ? <div className="no-record"><h3>No Record</h3></div>
                        : todos.slice(0).reverse().map((todo, index) => ( // Reversing the order of todos
                            <div key={index} className="todo-item">
                                {editingTodo && editingTodo._id === todo._id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editTask}
                                            onChange={(e) => setEditTask(e.target.value)}
                                        />
                                        <button onClick={handleUpdate}>Update</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{todo.task}</span>
                                        <div className="todo-icons">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(todo)} />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(todo._id)} />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Home;
