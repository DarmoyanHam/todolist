import { useState } from "react";

export const Todo = ({
    id,
    title,
    completed,
    onCheckboxClicked,
    onEditButtonClicked,
    onDeleteButtonClicked,
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(title);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    const handleSave = () => {
        onEditButtonClicked(id, updatedValue);
        toggleEditMode();
    }

    const handleCancel = () => {
        setUpdatedValue(title);
        toggleEditMode();
    }

    return (
        <li className="todo-item">
        {!isEditMode ? 
            <>
                <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={completed}
                    onChange={onCheckboxClicked}
                />
                <span className="todo-title">{title}</span>
                <button 
                    className="edit-button"
                    onClick={toggleEditMode}
                >  
                    Edit
                </button>
                <button
                    className="delete-button"
                    onClick={onDeleteButtonClicked}
                >
                    Delete
                </button>
            </> : 
            <>
               <input
                    type="text"
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button> 
            </>}
        </li>
    );
}