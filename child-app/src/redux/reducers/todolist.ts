import { createSlice } from '@reduxjs/toolkit';

type Task = {
    id: number;
    name: string;
    status: boolean;
};

let id = 1;

type TodoListState = {
    tasks: Task[];
    message: string;
};

const initialState: TodoListState = {
    tasks: [],
    message: ''
};

const addTaskById = (curTask: { taskName: string }): Task => {
    let newTask: Task = {
        id: id++,
        name: curTask?.taskName,
        status: false
    };
    return newTask;
}

const todoListReducer = createSlice({
    name: 'todoListReducer',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(addTaskById(action.payload));
            state.message = `Added task along with id ${id - 1}`;
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            state.message = `Removed task id ${action.payload.id}`;
        }
    }
})

export const { addTask, removeTask } = todoListReducer.actions;
export default todoListReducer.reducer;
