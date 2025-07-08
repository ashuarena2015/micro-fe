import React, { FC, useState } from 'react';
import { addTask, removeTask } from '../../redux/reducers/todolist';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

type Task = {
    id: string | number;
    name: string;
};

const TodoList: FC = () => {

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();
    const { tasks, message } = useSelector((state: any) => state.todoListReducer);

    const handleChange = (e: any) => {
        setTaskName(e.target.value);
    }

    const handleAddTask = () => {
        dispatch(addTask({
            taskName
        }))
    }

    const handleRemoveTask = (id: string | number) => {
        dispatch(removeTask({
            id
        }))
    }

    return (
        <div>
            <h2>Todo List</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Task name here..."
                    aria-label="Task name here"
                    aria-describedby="basic-addon2"
                    type="text"
                    id="task_name"
                    name="task_name"
                    onChange={handleChange}
                />
                <Button onClick={() => handleAddTask()} variant="outline-secondary" id="button-addon2" />
                {tasks?.map((task: Task, index: number) => {
                    return (
                        <ListGroup.Item as="li" key={index} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{task.name}</div>
                            </div>
                            <button onClick={() => handleRemoveTask(task?.id)}>Delete task</button>
                        </ListGroup.Item>
                    )
                })}
            </InputGroup>
        </div>
    );
}

export default TodoList;
