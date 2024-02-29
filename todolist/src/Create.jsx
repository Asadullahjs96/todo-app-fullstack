import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Create({ onAddTodo, onUpdateTodo, editingTodo }) {
    const [task, setTask] = useState('');

    useEffect(() => {
        if (editingTodo) {
            setTask(editingTodo.task);
        } else {
            setTask('');
        }
    }, [editingTodo]);

    const handleAdd = () => {
        if (editingTodo) {
            axios.put(`http://localhost:3001/update/${editingTodo._id}`, { task: task })
                .then(() => {
                    onUpdateTodo(); // Trigger fetchTodos in the parent component after updating todo
                })
                .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:3001/add', { task: task })
                .then(result => {
                    console.log(result);
                    setTask('');
                    onAddTodo(); // Trigger fetchTodos in the parent component after adding todo
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="create-container">
            <h2 className="create-title">Add New Task</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Enter Task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)} />
                <button className="add-button" type='button' onClick={handleAdd}>{editingTodo ? 'Update' : 'Add'}</button>
            </div>
        </div>
    );
}

export default Create;
