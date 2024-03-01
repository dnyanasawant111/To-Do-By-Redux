import { createSlice } from '@reduxjs/toolkit';

const toDoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: JSON.parse(localStorage.getItem('todos')) || []

    },
    reducers: {

        addToDo: (state, action) => {
            state.todos.push({ ...action.payload, complete: false });
            localStorage.setItem('todos', JSON.stringify(state.todos));

        },
        completedWork: (state, action) => {
            state.todos[action.payload].completed = !state.todos[action.payload].completed;
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        deleteToDo: (state, action) => {
            const index = action.payload
            console.log(index)
            state.todos.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        editToDo: (state, action) => {
            const { title, description } = action.payload;
            const index = action.payload.index;
            state.todos[index] = { ...state.todos[index], title, description };
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        clearAllCompletedTask: (state) => {
            state.todos = state.todos.filter(todo => !todo.completed);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        }

    }
});

export const { addToDo, completedWork, deleteToDo, editToDo, clearAllCompletedTask} = toDoSlice.actions;

export default toDoSlice.reducer;