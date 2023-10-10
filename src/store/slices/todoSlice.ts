import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../models/todo';

interface todoState {
    todos: ITodo[];
}

const initialState: todoState = {
    todos: [
        {id: '1', title: 'Complete test task', description: 'Tech stack: React, typescript, redux, react-bootstrap, scss', status: true},
        {id: '2', title: 'Deploy site', description: 'Using Vercel', status: true},
        {id: '3', title: 'Pass the interview', description: '', status: false},
    ]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            const newTodo = {
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                status: action.payload.status
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action:PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        changeStatusTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {...todo, status: !todo.status}
                }
                return todo
            })
        },
        editTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    return {...action.payload}
                }
                return todo
            })
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => todo.status !== true)
        }
    }
})

export const { addTodo, removeTodo, editTodo, changeStatusTodo, clearCompleted } = todoSlice.actions;

export default todoSlice.reducer;